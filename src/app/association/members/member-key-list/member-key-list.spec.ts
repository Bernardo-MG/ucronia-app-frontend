import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { KeyAssignment } from '@ucronia/domain';
import { of, Subject, throwError } from 'rxjs';
import { MemberKeyService } from '../member-key-service';
import { MemberKeyList } from './member-key-list';

describe('MemberKeyList', () => {
  let component: MemberKeyList;
  let fixture: ComponentFixture<MemberKeyList>;
  let keys: KeyAssignment[];

  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
  const memberKeyServiceMock = jasmine.createSpyObj<MemberKeyService>('MemberKeyService', ['getAll']);

  beforeEach(async () => {
    keys = [
      {
        number: 1,
        available: false,
        description: 'Principal',
        member: { number: 10, memberNumber: 37, name: 'Ana García' }
      },
      { number: 2, available: true, description: 'Lateral' },
      {
        number: 3,
        available: true,
        description: 'Principal',
        member: { number: 20, memberNumber: 12, name: 'Carlos Torres' }
      }
    ];
    authServiceMock.hasPermission.and.returnValue(true);
    memberKeyServiceMock.getAll.calls.reset();
    memberKeyServiceMock.getAll.and.returnValue(of(keys));

    await TestBed.configureTestingModule({
      imports: [MemberKeyList],
      providers: [
        provideNoopAnimations(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: MemberKeyService, useValue: memberKeyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberKeyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not request assignments without key read permission', () => {
    authServiceMock.hasPermission.and.returnValue(false);
    memberKeyServiceMock.getAll.calls.reset();
    fixture.destroy();

    fixture = TestBed.createComponent(MemberKeyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.load();

    expect(authServiceMock.hasPermission).toHaveBeenCalledWith(UcroniaPermissions.key.read);
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('p-table')).toBeNull();
  });

  it('should display assigned members and clearly mark unassigned keys', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(3);
    expect(rows[0].textContent).toContain('Ana García');
    expect(rows[0].textContent).toContain('Socio #37');
    expect(rows[0].textContent).toContain('No disponible');
    expect(rows[1].textContent).toContain('Sin asignar');
    expect(rows[1].textContent).toContain('Sin socio asignado');
    expect(component.assigned).toBe(2);
    expect(component.unassigned).toBe(1);
  });

  it('should filter assignment independently of key availability', () => {
    component.assignment = 'unassigned';

    expect(component.filtered.map(key => key.number)).toEqual([2]);

    component.assignment = 'assigned';

    expect(component.filtered.map(key => key.number)).toEqual([1, 3]);
  });

  it('should search by member name and member number', () => {
    component.query = 'ana';

    expect(component.filtered.map(key => key.number)).toEqual([1]);

    component.query = '#37';

    expect(component.filtered.map(key => key.number)).toEqual([1]);
  });

  it('should reset pagination when filtering', () => {
    component.first = 20;
    component.onFilter();

    expect(component.first).toBe(0);
  });

  it('should reload after the current request completes when a key is created during loading', () => {
    const response = new Subject<KeyAssignment[]>();
    const updated = [...keys, { number: 4, available: true, description: 'Nueva' }];
    memberKeyServiceMock.getAll.calls.reset();
    memberKeyServiceMock.getAll.and.returnValues(response, of(updated));

    component.load();
    component.load();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);

    response.next(keys);
    response.complete();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(component.data).toEqual(updated);
    expect(component.unassigned).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should allow retry after a failed request', () => {
    memberKeyServiceMock.getAll.and.returnValue(throwError(() => new Error('Failed')));
    component.load();

    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();

    memberKeyServiceMock.getAll.and.returnValue(of(keys));
    component.load();

    expect(component.error).toBeFalse();
    expect(component.data).toEqual(keys);
  });
});
