import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserActivateService } from '../../services/user-activate.service';
import { UserActivateUserFormComponent } from '../user-activate-user-form/user-activate-user-form.component';
import { UserActivateUserComponent } from './user-activate-user.component';

describe('UserActivateUserComponent', () => {
  let component: UserActivateUserComponent;
  let fixture: ComponentFixture<UserActivateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        UserActivateUserComponent,
        UserActivateUserFormComponent
      ],
      providers: [
        AccessUserActivateService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
