import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { SecurityRoleService } from '../../service/security-role.service';
import { SecurityRoleListViewComponent } from './security-role-list-view.component';

describe('SecurityRoleListViewComponent', () => {
  let component: SecurityRoleListViewComponent;
  let fixture: ComponentFixture<SecurityRoleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
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
