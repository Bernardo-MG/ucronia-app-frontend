import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRoleEditViewComponent } from './security-role-edit-view.component';

describe('SecurityRoleEditViewComponent', () => {
  let component: SecurityRoleEditViewComponent;
  let fixture: ComponentFixture<SecurityRoleEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRoleEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
