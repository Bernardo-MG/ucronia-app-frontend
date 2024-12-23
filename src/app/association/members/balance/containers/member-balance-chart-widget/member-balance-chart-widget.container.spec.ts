import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberBalanceService } from '../../services/member-balance.service';
import { MemberBalanceChartWidgetContainer } from './member-balance-chart-widget.container';

describe('MemberBalanceChartWidgetContainer', () => {
  let component: MemberBalanceChartWidgetContainer;
  let fixture: ComponentFixture<MemberBalanceChartWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MemberBalanceChartWidgetContainer
      ],
      providers: [
        MemberBalanceService
      ]
    });
    fixture = TestBed.createComponent(MemberBalanceChartWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
