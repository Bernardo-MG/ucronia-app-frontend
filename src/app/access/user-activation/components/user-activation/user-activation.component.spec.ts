import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserActivateService } from '../../services/user-activate.service';
import { UserActivationFormComponent } from '../user-activation-form/user-activation-form.component';
import { UserActivationComponent } from './user-activation.component';

describe('UserActivationComponent', () => {
  let component: UserActivationComponent;
  let fixture: ComponentFixture<UserActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        UserActivationComponent,
        UserActivationFormComponent
      ],
      providers: [
        AccessUserActivateService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
