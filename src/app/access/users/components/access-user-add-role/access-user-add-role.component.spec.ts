import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserAddRoleComponent } from './access-user-add-role.component';

describe('AccessUserAddRoleComponent', () => {
  let component: AccessUserAddRoleComponent;
  let fixture: ComponentFixture<AccessUserAddRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessUserAddRoleComponent]
    });
    fixture = TestBed.createComponent(AccessUserAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
