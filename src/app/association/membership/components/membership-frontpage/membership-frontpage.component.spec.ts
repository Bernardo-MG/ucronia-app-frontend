import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeesModule } from '@app/association/fees/fees.module';
import { MembersModule } from '@app/association/members/members.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FeeCalendarService } from '../../../fees/services/fee-calendar.service';
import { MemberBalanceService } from '../../../members/services/member-balance.service';
import { MemberService } from '../../../members/services/member.service';
import { MembershipFrontpageComponent } from './membership-frontpage.component';

describe('MembershipFrontpageComponent', () => {
  let component: MembershipFrontpageComponent;
  let fixture: ComponentFixture<MembershipFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PaginationModule,
        LayoutModule,
        FeesModule,
        MembersModule
      ],
      declarations: [
        MembershipFrontpageComponent
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
