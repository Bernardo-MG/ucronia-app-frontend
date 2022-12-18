import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSideMenuOptionsComponent } from './navigation-side-menu-options.component';

describe('NavigationSideMenuOptionsComponent', () => {
  let component: NavigationSideMenuOptionsComponent;
  let fixture: ComponentFixture<NavigationSideMenuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationSideMenuOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationSideMenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
