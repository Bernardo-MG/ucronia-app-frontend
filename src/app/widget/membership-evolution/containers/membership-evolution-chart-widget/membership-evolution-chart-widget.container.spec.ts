import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembershipEvolutionService } from '../../services/membership-evolution.service';
import { MembershipEvolutionChartWidgetContainer } from './membership-evolution-chart-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MembershipEvolutionChartWidgetContainer', () => {
  let component: MembershipEvolutionChartWidgetContainer;
  let fixture: ComponentFixture<MembershipEvolutionChartWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MembershipEvolutionChartWidgetContainer],
    providers: [
        MembershipEvolutionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(MembershipEvolutionChartWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
