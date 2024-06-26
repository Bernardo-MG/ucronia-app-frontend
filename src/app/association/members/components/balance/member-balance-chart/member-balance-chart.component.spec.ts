import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberBalanceChartComponent } from './member-balance-chart.component';

describe('MemberBalanceChartComponent', () => {
  let component: MemberBalanceChartComponent;
  let fixture: ComponentFixture<MemberBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MemberBalanceChartComponent
      ]
    });
    fixture = TestBed.createComponent(MemberBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
