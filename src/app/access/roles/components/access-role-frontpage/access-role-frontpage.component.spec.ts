import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleSelectionListComponent } from '../access-role-selection-list/access-role-selection-list.component';
import { AccessFrontpageComponent } from './access-role-frontpage.component';

describe('AccessFrontpageComponent', () => {
  let component: AccessFrontpageComponent;
  let fixture: ComponentFixture<AccessFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        LayoutModule
      ],
      declarations: [
        AccessFrontpageComponent,
        AccessRoleSelectionListComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
