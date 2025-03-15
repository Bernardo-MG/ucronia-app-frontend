import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembershipEvolutionChartComponent } from './membership-evolution-chart.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MembershipEvolutionChartComponent', () => {
  let component: MembershipEvolutionChartComponent;
  let fixture: ComponentFixture<MembershipEvolutionChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MembershipEvolutionChartComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(MembershipEvolutionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
