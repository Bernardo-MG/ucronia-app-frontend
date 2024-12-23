import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleInfoEditionContainer } from './access-role-edition.container';

describe('AccessRoleInfoEditionContainer', () => {
  let component: AccessRoleInfoEditionContainer;
  let fixture: ComponentFixture<AccessRoleInfoEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AccessRoleInfoEditionContainer
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfoEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
