import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserRoleSelectionComponent } from '../access-user-role-selection/access-user-role-selection.component';
import { AccessUserRoleFormComponent } from './access-user-roles.component';

describe('AccessUserRoleFormComponent', () => {
  let component: AccessUserRoleFormComponent;
  let fixture: ComponentFixture<AccessUserRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CoreModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        AccessUserRoleFormComponent,
        AccessUserRoleSelectionComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
