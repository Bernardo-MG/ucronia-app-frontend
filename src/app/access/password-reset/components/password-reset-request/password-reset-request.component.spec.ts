import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordResetService } from '../../services/password-reset.service';
import { PasswordResetRequestFormComponent } from '../password-reset-request-form/password-reset-request-form.component';
import { PasswordResetRequestComponent } from './password-reset-request.component';

describe('PasswordResetRequestComponent', () => {
  let component: PasswordResetRequestComponent;
  let fixture: ComponentFixture<PasswordResetRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        PasswordResetRequestComponent,
        PasswordResetRequestFormComponent
      ],
      providers: [
        PasswordResetService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
