import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { MemberBalanceService } from '../../services/member-balance.service';
import { MemberService } from '../../services/member.service';
import { FeeCalendarComponent } from '../fee-calendar/fee-calendar.component';
import { MemberBalanceChartComponent } from '../member-balance-chart/member-balance-chart.component';
import { MemberSelectionListComponent } from '../member-selection-list/member-selection-list.component';
import { MembershipFrontpageComponent } from './membership-frontpage.component';

describe('MembershipFrontpageComponent', () => {
  let component: MembershipFrontpageComponent;
  let fixture: ComponentFixture<MembershipFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PaginationModule,
        LayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        MembershipFrontpageComponent,
        MemberSelectionListComponent,
        FeeCalendarComponent,
        MemberBalanceChartComponent
      ],
      providers: [
        MemberService,
        MemberBalanceService,
        FeeCalendarService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MembershipFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
