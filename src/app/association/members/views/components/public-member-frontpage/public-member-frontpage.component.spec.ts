import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberBalanceService } from '@app/association/members/balance/services/member-balance.service';
import { MemberService } from '@app/association/members/core/services/member.service';
import { PublicMemberFrontpageComponent } from './public-member-frontpage.component';

describe('PublicMemberFrontpageComponent', () => {
  let component: PublicMemberFrontpageComponent;
  let fixture: ComponentFixture<PublicMemberFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PublicMemberFrontpageComponent
      ],
      providers: [
        MemberService,
        MemberBalanceService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicMemberFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
