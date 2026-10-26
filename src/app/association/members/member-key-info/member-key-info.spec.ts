import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { KeyAssignment } from '@ucronia/domain';
import { MemberKeyInfo } from './member-key-info';

describe('MemberKeyInfo', () => {
  let component: MemberKeyInfo;
  let fixture: ComponentFixture<MemberKeyInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberKeyInfo],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberKeyInfo);
    component = fixture.componentInstance;
    const key: KeyAssignment = {
      number: 3,
      available: false,
      description: 'Principal',
      profile: { number: 10, name: 'Ana García' }
    };
    fixture.componentRef.setInput('data', key);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render key details and the assigned member without a drawer or actions', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Llave #3');
    expect(content).toContain('Principal');
    expect(content).toContain('Perdida');
    expect(content).toContain('Ana García');
    expect(content).toContain('Perfil #10');
    expect(fixture.nativeElement.querySelector('p-drawer')).toBeNull();
    expect(fixture.nativeElement.querySelector('shared-drawer-actions')).toBeNull();
  });

  it('should clearly identify an unassigned key', () => {
    fixture.componentRef.setInput('data', { number: 2, available: true, description: '' });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Sin perfil asignado');
    expect(fixture.nativeElement.textContent).toContain('Sin información');
  });
});
