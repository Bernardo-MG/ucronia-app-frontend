import type { MockedObject } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService, SecurityDetails } from '@bernardo-mg/authentication';
import { of } from 'rxjs';
import { LayoutService } from '../layout-service';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  let mockAuthService: MockedObject<Pick<AuthService, 'logout' | 'hasPermission' | 'securityDetails'>>;
  let mockLayoutService: MockedObject<Pick<LayoutService, 'getTitle' | 'showSettingsLink' | 'showSecurityLink'>>;

  let isLogged = false;

  beforeEach(async () => {
    mockAuthService = {
      logout: vi.fn(
      ).mockName("AuthService.logout"),
      hasPermission: vi.fn().mockName("AuthService.hasPermission"),

        securityDetails: of({ username: 'test-user' } as SecurityDetails)
      }
    ;

    Object.defineProperty(mockAuthService, 'logged', {
      get: () => isLogged
    });

    mockLayoutService = {
      getTitle: vi.fn(
      ).mockName("LayoutService.getTitle"),
      showSettingsLink: vi.fn().mockName("LayoutService.showSettingsLink"),
        showSecurityLink: vi.fn().mockName("LayoutService.showSecurityLink")
    };

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: LayoutService, useValue: mockLayoutService }
      ]
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should use title from layout service', () => {
    mockLayoutService.getTitle.mockReturnValue('My App');
    createComponent();
    expect(component.title).toBe('My App');
  });

  describe('flags', () => {

    it('should show all flags as true and populate menuItems', () => {
      isLogged = true;
      mockLayoutService.getTitle.mockReturnValue('App');
      mockLayoutService.showSettingsLink.mockReturnValue(true);
      mockLayoutService.showSecurityLink.mockReturnValue(true);

      mockAuthService.hasPermission.mockImplementation(
        (permission: { resource: string; action: string ; }) => {
          return ['profile', 'funds', 'library'].includes(permission.resource)
            && permission.action === 'READ';
        }
      );

      createComponent();

      expect(component.loggedOut).toBe(false);
      expect(component.showSettings).toBe(true);
      expect(component.showSecurity).toBe(true);
    });

    it('should refresh permission flags after login without recreating the navbar', () => {
      let showSettings = false;
      let showSecurity = false;
      mockLayoutService.showSettingsLink.mockImplementation(() => showSettings);
      mockLayoutService.showSecurityLink.mockImplementation(() => showSecurity);

      createComponent();

      expect(component.showSettings).toBe(false);
      expect(component.showSecurity).toBe(false);

      showSettings = true;
      showSecurity = true;
      fixture.detectChanges();

      expect(component.showSettings).toBe(true);
      expect(component.showSecurity).toBe(true);
    });

  });

});