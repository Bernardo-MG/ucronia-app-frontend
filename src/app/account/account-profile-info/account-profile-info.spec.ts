import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from '@ucronia/domain';

import { AccountProfileInfo } from './account-profile-info';

describe('AccountProfileInfo', () => {
  let component: AccountProfileInfo;
  let fixture: ComponentFixture<AccountProfileInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileInfo]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountProfileInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the empty state when no profile is provided', () => {
    fixture.componentRef.setInput('data', undefined);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Sin miembro asignado');
    expect(content).toContain(
      'Esta cuenta no está vinculada a ningún socio'
    );
  });

  it('should show the loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.animate-pulse')).not.toBeNull();
    expect(element.textContent).not.toContain(
      'Sin miembro asignado'
    );
  });

  it('should prioritize the loading state over profile data', () => {
    fixture.componentRef.setInput('data', createProfile());
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.animate-pulse')).not.toBeNull();
    expect(element.textContent).not.toContain(
      'Bernardo Martínez García'
    );
    expect(element.textContent).not.toContain(
      'Sin miembro asignado'
    );
  });

  it('should show the profile information', () => {
    fixture.componentRef.setInput('data', createProfile());
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Bernardo Martínez García');
    expect(content).toContain('Socio número 123');
    expect(content).toContain('Número de socio');
    expect(content).toContain('123');
    expect(content).toContain('Nombre');
    expect(content).toContain('Bernardo');
    expect(content).toContain('Apellidos');
    expect(content).toContain('Martínez García');
    expect(content).toContain('DNI');
    expect(content).toContain('12345678A');
    expect(content).not.toContain('Sin miembro asignado');
  });

  it('should expose the full member name', () => {
    fixture.componentRef.setInput('data', createProfile());

    expect(component.memberName).toBe(
      'Bernardo Martínez García'
    );
  });

  it('should return an empty member name without a profile', () => {
    fixture.componentRef.setInput('data', undefined);

    expect(component.memberName).toBe('');
  });

  function createProfile(): Profile {
    const profile = new Profile();

    Object.assign(profile, {
      number: 123,
      identifier: '12345678A'
    });

    Object.assign(profile.name, {
      firstName: 'Bernardo',
      lastName: 'Martínez García',
      fullName: 'Bernardo Martínez García'
    });

    return profile;
  }

});