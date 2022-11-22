import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSideMenuWrapperComponent } from './navigation-side-menu-wrapper.component';

describe('NavigationSideMenuWrapperComponent', () => {
  let component: NavigationSideMenuWrapperComponent;
  let fixture: ComponentFixture<NavigationSideMenuWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationSideMenuWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationSideMenuWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
