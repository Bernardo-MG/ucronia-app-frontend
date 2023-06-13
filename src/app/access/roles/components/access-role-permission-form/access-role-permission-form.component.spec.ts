import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRolePermissionFormComponent } from './access-role-permission-form.component';

describe('AccessRolePermissionFormComponent', () => {
  let component: AccessRolePermissionFormComponent;
  let fixture: ComponentFixture<AccessRolePermissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CoreModule,
        PaginationModule
      ],
      declarations: [
        AccessRolePermissionFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRolePermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
