import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleService } from '../../../services/access-role.service';
import { AccessRoleFrontpageComponent } from './access-role-frontpage.component';

describe('AccessRoleFrontpageComponent', () => {
  let component: AccessRoleFrontpageComponent;
  let fixture: ComponentFixture<AccessRoleFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AccessRoleFrontpageComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
