import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleSelectionListComponent } from './access-role-selection-list.component';

describe('AccessRoleSelectionListComponent', () => {
  let component: AccessRoleSelectionListComponent;
  let fixture: ComponentFixture<AccessRoleSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule,
        PaginationModule,
        AccessRoleSelectionListComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
