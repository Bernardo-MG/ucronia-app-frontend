import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberService } from '@app/association/members/services/member.service';
import { MemberListContainer } from './member-list.container';

describe('MemberListContainer', () => {
  let component: MemberListContainer;
  let fixture: ComponentFixture<MemberListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberListContainer
      ],
      providers: [
        MemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
