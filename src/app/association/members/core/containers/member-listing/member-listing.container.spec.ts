import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberBalanceService } from '@app/association/members/balance/services/member-balance.service';
import { MemberService } from '@app/association/members/core/services/member.service';
import { MemberListingContainer } from './member-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MemberListingContainer', () => {
  let component: MemberListingContainer;
  let fixture: ComponentFixture<MemberListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberListingContainer
      ],
      providers: [
        MemberService,
        MemberBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
