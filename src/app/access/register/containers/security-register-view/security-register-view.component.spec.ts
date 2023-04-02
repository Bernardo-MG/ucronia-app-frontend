import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityRegisterFormComponent } from '../../components/security-register-form/security-register-form.component';
import { SecurityRegisterViewComponent } from './security-register-view.component';
import { SecurityRegisterService } from '@app/access/register/security-register.service';

describe('SecurityRegisterViewComponent', () => {
  let component: SecurityRegisterViewComponent;
  let fixture: ComponentFixture<SecurityRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        SecurityRegisterService
      ],
      declarations: [
        SecurityRegisterViewComponent,
        SecurityRegisterFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
