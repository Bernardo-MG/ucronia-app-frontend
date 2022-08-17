import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBalanceViewComponent } from './admin-balance-view.component';

describe('AdminBalanceViewComponent', () => {
  let component: AdminBalanceViewComponent;
  let fixture: ComponentFixture<AdminBalanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBalanceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBalanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
