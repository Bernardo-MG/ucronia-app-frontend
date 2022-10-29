import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityChangePasswordViewComponent } from './security-change-password-view.component';

describe('SecurityChangePasswordViewComponent', () => {
  let component: SecurityChangePasswordViewComponent;
  let fixture: ComponentFixture<SecurityChangePasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityChangePasswordViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityChangePasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
