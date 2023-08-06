import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetRequestFormComponent } from './password-reset-request-form.component';

describe('PasswordResetRequestFormComponent', () => {
  let component: PasswordResetRequestFormComponent;
  let fixture: ComponentFixture<PasswordResetRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ 
        PasswordResetRequestFormComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
