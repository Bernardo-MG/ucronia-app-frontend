import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSideMenuComponent } from './navigation-side-menu.component';

describe('NavigationSideMenuComponent', () => {
  let component: NavigationSideMenuComponent;
  let fixture: ComponentFixture<NavigationSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
