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

      expect(component.loggedOut).toBeFalse();
      expect(component.showSettings).toBeTrue();
      expect(component.showSecurity).toBeTrue();
      expect(component.showAssociation).toBeTrue();
    });

  });

});
