import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRegisterFormComponent } from './security-register-form.component';

describe('SecurityRegisterFormComponent', () => {
  let component: SecurityRegisterFormComponent;
  let fixture: ComponentFixture<SecurityRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRegisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
