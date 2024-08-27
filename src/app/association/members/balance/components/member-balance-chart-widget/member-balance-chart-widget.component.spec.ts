import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberBalanceService } from '../../../services/member-balance.service';
import { MemberBalanceChartWidgetComponent } from './member-balance-chart-widget.component';

describe('MemberBalanceChartWidgetComponent', () => {
  let component: MemberBalanceChartWidgetComponent;
  let fixture: ComponentFixture<MemberBalanceChartWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MemberBalanceChartWidgetComponent
      ],
      providers: [
        MemberBalanceService
      ]
    });
    fixture = TestBed.createComponent(MemberBalanceChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
