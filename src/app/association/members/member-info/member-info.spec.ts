import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Member, PublicMember } from '@ucronia/domain';
import { MemberInfo } from './member-info';

describe('MemberInfo', () => {
  let component: MemberInfo;
  let fixture: ComponentFixture<MemberInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberInfo],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('publicData', Object.assign(new PublicMember(), { memberNumber: 37 }));
    fixture.componentRef.setInput('data', Object.assign(new Member(), { identifier: 'Private identifier' }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render public details and hide private information by default', () => {
    expect(fixture.nativeElement.textContent).toContain('Información pública');
    expect(fixture.nativeElement.textContent).not.toContain('Private identifier');
    expect(fixture.nativeElement.querySelector('p-drawer')).toBeNull();
  });

  it('shows the last paid month in the public details of an inactive member', () => {
    fixture.componentRef.setInput('publicData', Object.assign(new PublicMember(), {
      active: false,
      lastPaidMonth: new Date('2024-04-01T00:00:00Z')
    }));
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('ui-detail-field[name="Mes de baja"]');
    expect(field?.textContent).toContain('04/2024');
  });

  it('shows a placeholder for an inactive member without a paid month', () => {
    fixture.componentRef.setInput('publicData', Object.assign(new PublicMember(), { active: false }));
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('ui-detail-field[name="Mes de baja"]');
    expect(field?.textContent).toContain('—');
  });

  it('hides the last paid month for an active member', () => {
    fixture.componentRef.setInput('publicData', Object.assign(new PublicMember(), {
      active: true,
      lastPaidMonth: new Date('2024-04-01T00:00:00Z')
    }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ui-detail-field[name="Mes de baja"]')).toBeNull();
  });

  it('should separate private information when the view permits it', () => {
    fixture.componentRef.setInput('showPrivate', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('hr')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('La siguiente información es privada');
    expect(fixture.nativeElement.textContent).toContain('Private identifier');
  });

  it('should emit a retry request without loading data itself', () => {
    const retry = spyOn(component.retry, 'emit');
    fixture.componentRef.setInput('showPrivate', true);
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();

    expect(retry).toHaveBeenCalledTimes(1);
  });
  it('should show a placeholder when the public member number is missing', () => {
    fixture.componentRef.setInput('publicData', new PublicMember());
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('—');
    expect(fixture.nativeElement.textContent).not.toContain('#undefined');
  });

});
