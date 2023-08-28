import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleSelectionListComponent } from '../access-role-selection-list/access-role-selection-list.component';
import { AccessRoleListComponent } from './access-role-list.component';

describe('AccessRoleListComponent', () => {
  let component: AccessRoleListComponent;
  let fixture: ComponentFixture<AccessRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        CoreModule,
        LayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        AccessRoleListComponent,
        AccessRoleSelectionListComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
