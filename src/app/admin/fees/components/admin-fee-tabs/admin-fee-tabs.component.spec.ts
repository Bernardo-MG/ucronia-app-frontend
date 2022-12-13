import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeeTabsComponent } from './admin-fee-tabs.component';

describe('AdminFeeTabsComponent', () => {
  let component: AdminFeeTabsComponent;
  let fixture: ComponentFixture<AdminFeeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeeTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
