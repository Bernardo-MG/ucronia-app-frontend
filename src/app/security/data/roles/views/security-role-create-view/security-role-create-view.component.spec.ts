import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/components/data-form/data-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRoleFormComponent } from '../../components/security-role-form/security-role-form.component';
import { SecurityRoleService } from '../../service/security-role.service';
import { SecurityRoleCreateViewComponent } from './security-role-create-view.component';

describe('SecurityRoleCreateViewComponent', () => {
  let component: SecurityRoleCreateViewComponent;
  let fixture: ComponentFixture<SecurityRoleCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        SecurityRoleCreateViewComponent,
        DataFormComponent,
        SecurityRoleFormComponent
      ],
      providers: [
        SecurityRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
