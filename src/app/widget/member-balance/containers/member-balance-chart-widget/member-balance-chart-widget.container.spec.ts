import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberBalanceService } from '../../services/member-balance.service';
import { MemberBalanceChartWidgetContainer } from './member-balance-chart-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MemberBalanceChartWidgetContainer', () => {
  let component: MemberBalanceChartWidgetContainer;
  let fixture: ComponentFixture<MemberBalanceChartWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MemberBalanceChartWidgetContainer],
    providers: [
        MemberBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
