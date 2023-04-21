import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserFormComponent } from '../../components/access-user-form/access-user-form.component';
import { AccessUserRoleFormComponent } from '../../components/access-user-role-form/access-user-role-form.component';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserEditViewComponent } from './access-user-edit-view.component';

describe('AccessUserEditViewComponent', () => {
  let component: AccessUserEditViewComponent;
  let fixture: ComponentFixture<AccessUserEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CoreModule,
        PaginationModule,
        LayoutModule,
        EditionModule
      ],
      declarations: [
        AccessUserEditViewComponent,
        AccessUserFormComponent,
        AccessUserRoleFormComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
