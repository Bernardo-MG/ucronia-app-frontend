import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SecurityRoleService } from '../../services/security-role.service';
import { SecurityRoleListViewComponent } from './security-role-list-view.component';
import { CoreModule } from '@app/core/core.module';

describe('SecurityRoleListViewComponent', () => {
  let component: SecurityRoleListViewComponent;
  let fixture: ComponentFixture<SecurityRoleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        ButtonsModule,
        CoreModule
      ],
      declarations: [ 
        SecurityRoleListViewComponent 
      ],
      providers: [
        SecurityRoleService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
