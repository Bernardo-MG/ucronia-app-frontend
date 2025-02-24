import { TestBed } from '@angular/core/testing';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ViewNodeFilter } from './view-node-filter';

// Create a mock AuthContainer
class MockAuthContainer {
  hasPermission(resource: string, permission: string): boolean {
    return false; // Default to no permissions in mock
  }
}

describe('ViewNodeFilter', () => {
  let viewNodeFilter: ViewNodeFilter;
  let authContainer: MockAuthContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewNodeFilter,
        { provide: AuthContainer, useClass: MockAuthContainer } // Mock the AuthContainer service
      ]
    });

    viewNodeFilter = TestBed.inject(ViewNodeFilter);
    authContainer = TestBed.inject(AuthContainer);
  });

  it('should create an instance', () => {
    expect(viewNodeFilter).toBeTruthy();
  });

  it('should filter menu links based on permissions', () => {
    // Define mock menu links
    const links: AuthMenuLink[] = [
      new AuthMenuLink('Dashboard', '/dashboard', 'dashboard-icon', 'dashboard-resource'),
      new AuthMenuLink('Settings', '/settings', 'settings-icon', 'settings-resource'),
    ];

    // Mock the permission check for each resource
    spyOn(authContainer, 'hasPermission').and.callFake((resource: string, permission: string) => {
      return (resource === 'dashboard-resource');
    });

    // Call the filterNodes function
    const filteredLinks = viewNodeFilter.filterNodes(links);

    // Check if only 'Dashboard' link was returned
    expect(filteredLinks.length).toBe(1);
    expect(filteredLinks[0].title).toBe('Dashboard');
    expect(filteredLinks[0].path).toBe('/dashboard');
    expect(filteredLinks[0].icon).toBe('dashboard-icon');
  });

  it('should return an empty array if no links have view permission', () => {
    // Define mock menu links
    const links: AuthMenuLink[] = [
      new AuthMenuLink('Dashboard', '/dashboard', 'dashboard-icon', 'dashboard-resource'),
      new AuthMenuLink('Settings', '/settings', 'settings-icon', 'settings-resource'),
    ];

    // Mock the permission check to return false for both resources
    spyOn(authContainer, 'hasPermission').and.returnValue(false);

    // Call the filterNodes function
    const filteredLinks = viewNodeFilter.filterNodes(links);

    // Check if no links were returned
    expect(filteredLinks.length).toBe(0);
  });

  it('should return all links if all have view permission', () => {
    // Define mock menu links
    const links: AuthMenuLink[] = [
      new AuthMenuLink('Dashboard', '/dashboard', 'dashboard-icon', 'dashboard-resource'),
      new AuthMenuLink('Settings', '/settings', 'settings-icon', 'settings-resource'),
    ];

    // Mock the permission check to return true for both resources
    spyOn(authContainer, 'hasPermission').and.returnValue(true);

    // Call the filterNodes function
    const filteredLinks = viewNodeFilter.filterNodes(links);

    // Check if all links were returned
    expect(filteredLinks.length).toBe(2);
    expect(filteredLinks[0].title).toBe('Dashboard');
    expect(filteredLinks[1].title).toBe('Settings');
  });

});
