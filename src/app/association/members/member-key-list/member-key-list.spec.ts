import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { KeyAssignment } from '@ucronia/domain';
import { MemberKeyList } from './member-key-list';

describe('MemberKeyList', () => {
  let component: MemberKeyList;
  let fixture: ComponentFixture<MemberKeyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberKeyList],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberKeyList);
    component = fixture.componentInstance;
    const keys: KeyAssignment[] = [
      {
        number: 1,
        available: false,
        description: 'Principal',
        member: { number: 10, memberNumber: 37, name: 'Ana García' }
      },
      { number: 2, available: true, description: 'Lateral' }
    ];
    fixture.componentRef.setInput('data', keys);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render assigned and unassigned keys from the view', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Ana García');
    expect(content).toContain('Socio #37');
    expect(content).toContain('No disponible');
    expect(content).toContain('Sin socio asignado');
    expect(component.assigned).toBe(1);
    expect(component.unassigned).toBe(1);
  });

  it('should emit the key selected from the row action', () => {
    const show = spyOn(component.show, 'emit');
    const button = fixture.nativeElement.querySelector('tbody tr p-button button') as HTMLButtonElement;

    button.click();

    expect(show).toHaveBeenCalledOnceWith(component.data()[0]);
    expect(fixture.nativeElement.querySelector('assoc-member-key-info')).toBeNull();
  });

  it('should retain local search and assignment filters', () => {
    component.query = '#37';

    expect(component.filtered.map(key => key.number)).toEqual([1]);

    component.query = '';
    component.assignment = 'unassigned';

    expect(component.filtered.map(key => key.number)).toEqual([2]);
  });

  it('should emit retry requests without loading data itself', () => {
    const retry = spyOn(component.retry, 'emit');
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('should reset pagination when the view supplies refreshed data', () => {
    component.first = 20;
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();

    expect(component.first).toBe(0);
  });
});
