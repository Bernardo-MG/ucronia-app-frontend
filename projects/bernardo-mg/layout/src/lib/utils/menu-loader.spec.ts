import { MenuLoader } from './menu-loader';
import { Menu } from '../models/menu';
import { MenuLink } from '../models/menu-link';
import { MenuOptions } from '../models/menu-options';

describe('MenuLoader', () => {
  let menuLoader: MenuLoader;

  beforeEach(() => {
    menuLoader = new MenuLoader();
  });

  it('should create an instance', () => {
    expect(menuLoader).toBeTruthy();
  });

  it('should load menus correctly from MenuOptions', () => {
    const menuOptions: MenuOptions = {
      section1: { title: 'Dashboard', links: [new MenuLink('Home', '/home', 'home-icon')] },
      section2: { title: 'Profile', links: [new MenuLink('Profile', '/profile', 'user-icon')] }
    };

    const menus: Menu[] = menuLoader.load(menuOptions);

    expect(menus.length).toBe(2);
    expect(menus[0].title).toBe('Dashboard');
    expect(menus[0].links.length).toBe(1);
    expect(menus[0].links[0].title).toBe('Home');
    expect(menus[0].links[0].path).toBe('/home');
    expect(menus[0].links[0].icon).toBe('home-icon');
  });

  it('should filter menu links using the provided filter function', () => {
    const menuOptions: MenuOptions = {
      section1: { title: 'Main', links: [
        new MenuLink('Visible Link', '/visible', 'visible-icon'),
        new MenuLink('Hidden Link', '/hidden', 'hidden-icon')
      ]}
    };

    const filterFn = (links: MenuLink[]) => links.filter(link => link.title !== 'Hidden Link');

    const menus: Menu[] = menuLoader.load(menuOptions, filterFn);

    expect(menus.length).toBe(1);
    expect(menus[0].links.length).toBe(1);
    expect(menus[0].links[0].title).toBe('Visible Link');
    expect(menus[0].links[0].path).toBe('/visible');
    expect(menus[0].links[0].icon).toBe('visible-icon');
  });

  it('should exclude sections with no remaining links after filtering', () => {
    const menuOptions: MenuOptions = {
      section1: { title: 'Empty Section', links: [new MenuLink('Hidden', '/hidden')] }
    };

    const filterFn = (links: MenuLink[]) => links.filter(link => false); // Remove all links

    const menus: Menu[] = menuLoader.load(menuOptions, filterFn);

    expect(menus.length).toBe(0);
  });

  it('should return an empty array if MenuOptions is empty', () => {
    const menuOptions: MenuOptions = {};
    const menus: Menu[] = menuLoader.load(menuOptions);
    
    expect(menus.length).toBe(0);
  });

  it('should return an empty array if all sections have empty links', () => {
    const menuOptions: MenuOptions = {
      section1: { title: 'No Links', links: [] },
      section2: { title: 'Still No Links', links: [] }
    };

    const menus: Menu[] = menuLoader.load(menuOptions);

    expect(menus.length).toBe(0);
  });
});
