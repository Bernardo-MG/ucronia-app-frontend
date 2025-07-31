import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthContainer, SecurityDetails } from '@bernardo-mg/authentication';
import { MenuLink } from '@bernardo-mg/ui';
import { of } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavbarContainer } from './navbar.container';

describe('NavbarContainer', () => {
  let component: NavbarContainer;
  let fixture: ComponentFixture<NavbarContainer>;

  // Mocks
  let mockAuthContainer: jasmine.SpyObj<AuthContainer>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;

  let isLogged = false;

  beforeEach(async () => {
    mockAuthContainer = jasmine.createSpyObj<AuthContainer>(
      'AuthContainer',
      ['logout'],
      {
        securityDetails: of({ username: 'test-user' } as SecurityDetails)
      }
    );
    Object.defineProperty(mockAuthContainer, 'logged', {
      get: () => isLogged
    });

    mockLayoutService = jasmine.createSpyObj('LayoutService', [
      'getTitle',
      'showSettingsLink',
      'showSecurityLink',
      'showAssociationLink',
      'getLinks'
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
    mockLayoutService.getLinks.and.returnValue([]);

    createComponent();

    expect(component).toBeTruthy();
  });

  it('should use title from layout service', () => {
    mockLayoutService.getTitle.and.returnValue('My App');
    mockLayoutService.getLinks.and.returnValue([]);

    createComponent();

    expect(component.title).toBe('My App');
  });

  it('should not load menu when logged out', () => {
    isLogged = false;
    mockLayoutService.showAssociationLink.and.returnValue(true);
    mockLayoutService.getLinks.and.returnValue([
      new MenuLink('Admin', '/admin')
    ]);

    createComponent();

    expect(component.loggedIn).toBeFalse();
    expect(component.menuItems.length).toBe(0);
  });

  describe('flags', () => {

    it('should show all flags as true and populate menuItems', () => {
      isLogged = true;
      mockLayoutService.showSettingsLink.and.returnValue(true);
      mockLayoutService.showSecurityLink.and.returnValue(true);
      mockLayoutService.showAssociationLink.and.returnValue(true);
      mockLayoutService.getLinks.and.returnValue([
        new MenuLink('Admin', '/admin')
      ]);

      createComponent();

      expect(component.loggedIn).toBeTrue();
      expect(component.loggedOut).toBeFalse();
      expect(component.showSettings).toBeTrue();
      expect(component.showSecurity).toBeTrue();
      expect(component.showAssociation).toBeTrue();
      expect(component.showAdmin).toBeTrue();
      expect(component.menuItems.length).toBe(2); // Asociación + Administración
    });

    it('should show all flags as false and empty menu', () => {
      isLogged = true;
      mockLayoutService.showSettingsLink.and.returnValue(false);
      mockLayoutService.showSecurityLink.and.returnValue(false);
      mockLayoutService.showAssociationLink.and.returnValue(false);
      mockLayoutService.getLinks.and.returnValue([]);

      createComponent();

      expect(component.loggedIn).toBeTrue();
      expect(component.showSettings).toBeFalse();
      expect(component.showSecurity).toBeFalse();
      expect(component.showAssociation).toBeFalse();
      expect(component.showAdmin).toBeFalse();
      expect(component.menuItems.length).toBe(0);
    });

  });

});
