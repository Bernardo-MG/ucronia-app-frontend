import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAccountMenuComponent } from './account-menu-options.component';

describe('NavigationAccountMenuComponent', () => {
  let component: NavigationAccountMenuComponent;
  let fixture: ComponentFixture<NavigationAccountMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationAccountMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
