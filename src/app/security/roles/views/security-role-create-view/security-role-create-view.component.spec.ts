import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRoleCreateViewComponent } from './security-role-create-view.component';

describe('SecurityRoleCreateViewComponent', () => {
  let component: SecurityRoleCreateViewComponent;
  let fixture: ComponentFixture<SecurityRoleCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRoleCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
