import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedModule } from '@app/shared/shared.module';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleListViewComponent } from './access-role-list-view.component';

describe('AccessRoleListViewComponent', () => {
  let component: AccessRoleListViewComponent;
  let fixture: ComponentFixture<AccessRoleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        CoreModule,
        SharedModule
      ],
      declarations: [ 
        AccessRoleListViewComponent 
      ],
      providers: [
        AccessRoleService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessRoleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
