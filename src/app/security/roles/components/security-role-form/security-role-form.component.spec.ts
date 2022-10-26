import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRoleFormComponent } from './security-role-form.component';

describe('SecurityRoleFormComponent', () => {
  let component: SecurityRoleFormComponent;
  let fixture: ComponentFixture<SecurityRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRoleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
