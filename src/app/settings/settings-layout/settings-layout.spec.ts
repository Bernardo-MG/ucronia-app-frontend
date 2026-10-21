import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { SettingsLayout } from './settings-layout';

describe('SettingsLayout', () => {
  let component: SettingsLayout;
  let fixture: ComponentFixture<SettingsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsLayout],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { hasPermission: () => true } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the remaining settings without a keys entry', () => {
    expect(fixture.nativeElement.textContent).toContain('Tipos de cuota');
    expect(fixture.nativeElement.textContent).toContain('Métodos de contacto');
    expect(fixture.nativeElement.textContent).not.toContain('Llaves');
    expect(fixture.nativeElement.querySelector('a[href$="/keys"]')).toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
