import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessRolePermissionsComponent } from './access-role-permissions.component';

describe('AccessRolePermissionsComponent', () => {
  let component: AccessRolePermissionsComponent;
  let fixture: ComponentFixture<AccessRolePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccessRolePermissionsComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRolePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
