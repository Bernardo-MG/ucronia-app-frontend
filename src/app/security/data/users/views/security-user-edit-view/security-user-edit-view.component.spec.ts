import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/components/data-form/data-form.component';
import { CoreModule } from '@app/core/core.module';
import { SecurityUserFormComponent } from '../../components/security-user-form/security-user-form.component';
import { SecurityUserRoleFormComponent } from '../../components/security-user-role-form/security-user-role-form.component';
import { SecurityUserService } from '../../service/security-user.service';
import { SecurityUserEditViewComponent } from './security-user-edit-view.component';

describe('SecurityUserEditViewComponent', () => {
  let component: SecurityUserEditViewComponent;
  let fixture: ComponentFixture<SecurityUserEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CoreModule
      ],
      declarations: [
        SecurityUserEditViewComponent,
        DataFormComponent,
        SecurityUserFormComponent,
        SecurityUserRoleFormComponent
      ],
      providers: [
        SecurityUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityUserEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
