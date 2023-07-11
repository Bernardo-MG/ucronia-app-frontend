import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleInfoComponent } from './access-role-info.component';

describe('AccessRoleInfoComponent', () => {
  let component: AccessRoleInfoComponent;
  let fixture: ComponentFixture<AccessRoleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
