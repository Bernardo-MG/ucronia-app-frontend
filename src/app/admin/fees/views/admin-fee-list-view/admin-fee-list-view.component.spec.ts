import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeeListViewComponent } from './admin-fee-list-view.component';

describe('AdminFeeListViewComponent', () => {
  let component: AdminFeeListViewComponent;
  let fixture: ComponentFixture<AdminFeeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeeListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
