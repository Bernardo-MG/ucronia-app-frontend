import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleCreationContainer } from './access-role-creation.container';
import { AccessRoleService } from '../../services/access-role.service';

describe('AccessRoleCreationContainer', () => {
  let component: AccessRoleCreationContainer;
  let fixture: ComponentFixture<AccessRoleCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AccessRoleCreationContainer
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
