import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleResourcePickListComponent } from './access-role-resource-pick-list.component';

describe('AccessRoleResourcePickListComponent', () => {
  let component: AccessRoleResourcePickListComponent;
  let fixture: ComponentFixture<AccessRoleResourcePickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleResourcePickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessRoleResourcePickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
