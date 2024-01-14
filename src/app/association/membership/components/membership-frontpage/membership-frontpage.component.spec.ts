import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FeeCalendarService } from '../../../fees/services/fee-calendar.service';
import { MemberBalanceService } from '../../../members/services/member-balance.service';
import { MemberService } from '../../../members/services/member.service';
import { FeeCalendarComponent } from '../../../fee/components/fee-calendar/fee-calendar.component';
import { MemberBalanceChartComponent } from '../../../members/modules/member-balance-chart/member-balance-chart.component';
import { MemberListComponent } from '../../../members/modules/member-list/member-list.component';
import { MembershipFrontpageComponent } from './membership-frontpage.component';

describe('MembershipFrontpageComponent', () => {
  let component: MembershipFrontpageComponent;
  let fixture: ComponentFixture<MembershipFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PaginationModule,
        LayoutModule
      ],
      declarations: [
        MembershipFrontpageComponent,
        MemberListComponent,
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
