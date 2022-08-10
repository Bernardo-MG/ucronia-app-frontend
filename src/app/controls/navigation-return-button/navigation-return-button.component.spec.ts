import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationReturnButtonComponent } from './navigation-return-button.component';

describe('NavigationReturnButtonComponent', () => {
  let component: NavigationReturnButtonComponent;
  let fixture: ComponentFixture<NavigationReturnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationReturnButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationReturnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
