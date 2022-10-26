import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRoleListViewComponent } from './security-role-list-view.component';

describe('SecurityRoleListViewComponent', () => {
  let component: SecurityRoleListViewComponent;
  let fixture: ComponentFixture<SecurityRoleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRoleListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
