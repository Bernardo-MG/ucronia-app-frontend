import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBalanceChartComponent } from './member-balance-chart.component';

describe('MemberBalanceChartComponent', () => {
  let component: MemberBalanceChartComponent;
  let fixture: ComponentFixture<MemberBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberBalanceChartComponent]
    });
    fixture = TestBed.createComponent(MemberBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
