import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberService } from '@app/association/members/services/member.service';
import { MemberListingContainer } from './member-listing.container';

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
