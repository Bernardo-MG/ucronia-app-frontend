import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberBalanceService } from '@app/association/members/balance/services/member-balance.service';
import { MemberService } from '@app/association/members/core/services/member.service';
import { MemberListingComponent } from './member-listing.component';

describe('MemberListingComponent', () => {
  let component: MemberListingComponent;
  let fixture: ComponentFixture<MemberListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MemberListingComponent
      ],
      providers: [
        MemberService,
        MemberBalanceService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
