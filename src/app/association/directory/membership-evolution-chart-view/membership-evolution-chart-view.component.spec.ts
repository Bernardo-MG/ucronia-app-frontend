import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MembershipEvolutionService } from '../membership-evolution-service';
import { MembershipEvolutionChartView } from './membership-evolution-chart-view.component';

describe('MembershipEvolutionChartView', () => {
  let component: MembershipEvolutionChartView;
  let fixture: ComponentFixture<MembershipEvolutionChartView>;

  const membershipEvolutionServiceMock = jasmine.createSpyObj<MembershipEvolutionService>(
    'MembershipEvolutionService',
    ['monthly']
  );

  beforeEach(() => {
    membershipEvolutionServiceMock.monthly.and.returnValue(
      of([])
    );

    TestBed.configureTestingModule({
      imports: [MembershipEvolutionChartView],
      providers: [
        { provide: MembershipEvolutionService, useValue: membershipEvolutionServiceMock }
      ]
    });
    fixture = TestBed.createComponent(MembershipEvolutionChartView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
