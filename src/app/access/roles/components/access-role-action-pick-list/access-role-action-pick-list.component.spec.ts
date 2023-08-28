import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleActionPickListComponent } from './access-role-action-pick-list.component';

describe('AccessRoleActionPickListComponent', () => {
  let component: AccessRoleActionPickListComponent;
  let fixture: ComponentFixture<AccessRoleActionPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleActionPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessRoleActionPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
