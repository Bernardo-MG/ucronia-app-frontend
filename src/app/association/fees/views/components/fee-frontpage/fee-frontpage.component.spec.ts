import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeReportService } from '@app/association/fees/core/services/fee-report.service';
import { FeeCalendarService } from '../../../core/services/fee-calendar.service';
import { FeeService } from '../../../core/services/fee.service';
import { FeeFrontpageComponent } from './fee-frontpage.component';

describe('FeeFrontpageComponent', () => {
  let component: FeeFrontpageComponent;
  let fixture: ComponentFixture<FeeFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FeeFrontpageComponent
      ],
      providers: [
        FeeCalendarService,
        FeeService,
        FeeReportService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
