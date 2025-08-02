import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthContainer, SecurityDetails } from '@bernardo-mg/authentication';
import { of } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavbarContainer } from './navbar.container';

describe('NavbarContainer', () => {
  let component: NavbarContainer;
  let fixture: ComponentFixture<NavbarContainer>;

  let mockAuthContainer: jasmine.SpyObj<AuthContainer>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;

  let isLogged = false;

  beforeEach(async () => {
    mockAuthContainer = jasmine.createSpyObj<AuthContainer>(
      'AuthContainer',
      [
        'logout',
        'hasPermission'
      ],
      {
        securityDetails: of({ username: 'test-user' } as SecurityDetails)
      }
    );

    Object.defineProperty(mockAuthContainer, 'logged', {
      get: () => isLogged
    });

    mockLayoutService = jasmine.createSpyObj(
      'LayoutService',
      [
        'getTitle',
        'showSettingsLink',
        'showSecurityLink',
        'showAssociationLink'
      ]);

    await TestBed.configureTestingModule({
      imports: [NavbarContainer],
      providers: [
        provideRouter([]),
        { provide: AuthContainer, useValue: mockAuthContainer },
        { provide: LayoutService, useValue: mockLayoutService }
      ]
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(NavbarContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should use title from layout service', () => {
    mockLayoutService.getTitle.and.returnValue('My App');
    createComponent();
    expect(component.title).toBe('My App');
  });

  it('should not load menu when logged out', () => {
    isLogged = false;
    mockLayoutService.getTitle.and.returnValue('App');
    mockLayoutService.showAssociationLink.and.returnValue(true);
    mockLayoutService.showSettingsLink.and.returnValue(false);
    mockLayoutService.showSecurityLink.and.returnValue(false);

    createComponent();

    expect(component.loggedIn).toBeFalse();
    expect(component.menuItems.length).toBe(1);
  });

  describe('flags', () => {

    it('should show all flags as true and populate menuItems', () => {
      isLogged = true;
      mockLayoutService.getTitle.and.returnValue('App');
      mockLayoutService.showSettingsLink.and.returnValue(true);
      mockLayoutService.showSecurityLink.and.returnValue(true);
      mockLayoutService.showAssociationLink.and.returnValue(true);

      mockAuthContainer.hasPermission.and.callFake((resource: string, action: string) => {
        return ['person', 'funds', 'library'].includes(resource) && action === 'view';
      });

      createComponent();

      expect(component.loggedIn).toBeTrue();
      expect(component.loggedOut).toBeFalse();
      expect(component.showSettings).toBeTrue();
      expect(component.showSecurity).toBeTrue();
      expect(component.showAssociation).toBeTrue();
      expect(component.menuItems.length).toBe(2); // Asociación + Administración

      const adminMenu = component.menuItems.find(m => m.label === 'Administración');
      expect(adminMenu?.items?.length).toBe(3);
    });

    it('should show all flags as false and result in empty menu', () => {
      isLogged = true;
      mockLayoutService.getTitle.and.returnValue('App');
      mockLayoutService.showSettingsLink.and.returnValue(false);
      mockLayoutService.showSecurityLink.and.returnValue(false);
      mockLayoutService.showAssociationLink.and.returnValue(false);

      mockAuthContainer.hasPermission.and.callFake((resource: string, action: string) => {
        return false;
      });

      createComponent();

      expect(component.loggedIn).toBeTrue();
      expect(component.menuItems.length).toBe(0);
    });

    it('should populate only some admin links based on permissions', () => {
      isLogged = true;
      mockLayoutService.getTitle.and.returnValue('App');
      mockLayoutService.showSettingsLink.and.returnValue(false);
      mockLayoutService.showSecurityLink.and.returnValue(false);
      mockLayoutService.showAssociationLink.and.returnValue(false);

      mockAuthContainer.hasPermission.and.callFake((resource: string, action: string) => {
        return resource === 'person' && action === 'view';
      });

      createComponent();

      const adminMenu = component.menuItems.find(m => m.label === 'Administración');
      expect(adminMenu?.items?.length).toBe(1);
      expect(adminMenu?.items?.[0].label).toBe('Gente');
    });

    it('should not add admin menu if no permissions', () => {
      isLogged = true;
      mockLayoutService.getTitle.and.returnValue('App');
      mockLayoutService.showSettingsLink.and.returnValue(false);
      mockLayoutService.showSecurityLink.and.returnValue(false);
      mockLayoutService.showAssociationLink.and.returnValue(false);

      mockAuthContainer.hasPermission.and.callFake((resource: string, action: string) => {
        return false;
      });

      createComponent();

      const adminMenu = component.menuItems.find(m => m.label === 'Administración');
      expect(adminMenu).toBeUndefined();
    });

  });

});
