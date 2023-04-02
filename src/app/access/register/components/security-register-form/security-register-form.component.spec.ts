import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SecurityRegisterFormComponent } from './security-register-form.component';

describe('SecurityRegisterFormComponent', () => {
  let component: SecurityRegisterFormComponent;
  let fixture: ComponentFixture<SecurityRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
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
