import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardViewComponent } from './admin-dashboard-view.component';

describe('AdminDashboardViewComponent', () => {
  let component: AdminDashboardViewComponent;
  let fixture: ComponentFixture<AdminDashboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
