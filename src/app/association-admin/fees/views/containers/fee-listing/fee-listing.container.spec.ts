import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeReportService } from '@app/association-admin/fees/chart/services/fee-report.service';
import { FeeCalendarService } from '../../../calendar/services/fee-calendar.service';
import { FeeService } from '../../../core/services/fee.service';
import { FeeListingContainer } from './fee-listing.container';

describe('FeeListingContainer', () => {
  let component: FeeListingContainer;
  let fixture: ComponentFixture<FeeListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FeeListingContainer
      ],
      providers: [
        FeeCalendarService,
        FeeService,
        FeeReportService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
