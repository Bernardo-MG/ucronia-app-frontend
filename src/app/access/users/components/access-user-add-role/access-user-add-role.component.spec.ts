import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserAddRoleComponent } from './access-user-add-role.component';

describe('AccessUserAddRoleComponent', () => {
  let component: AccessUserAddRoleComponent;
  let fixture: ComponentFixture<AccessUserAddRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        AccessUserAddRoleComponent
      ],
      providers: [
        AccessUserService
      ]
    });
    fixture = TestBed.createComponent(AccessUserAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
