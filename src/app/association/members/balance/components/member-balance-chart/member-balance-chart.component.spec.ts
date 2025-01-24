import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberBalanceChartComponent } from './member-balance-chart.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MemberBalanceChartComponent', () => {
  let component: MemberBalanceChartComponent;
  let fixture: ComponentFixture<MemberBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MemberBalanceChartComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(MemberBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
