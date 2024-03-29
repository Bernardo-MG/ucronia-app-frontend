import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleCreateComponent } from './access-role-create.component';

describe('AccessRoleCreateComponent', () => {
  let component: AccessRoleCreateComponent;
  let fixture: ComponentFixture<AccessRoleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccessRoleCreateComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
