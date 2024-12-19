import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberBalanceService } from '@app/association/members/balance/services/member-balance.service';
import { MemberService } from '@app/association/members/core/services/member.service';
import { MemberListingContainer } from './member-listing.container';

describe('MemberListingContainer', () => {
  let component: MemberListingContainer;
  let fixture: ComponentFixture<MemberListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MemberListingContainer
      ],
      providers: [
        MemberService,
        MemberBalanceService
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
