import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { MemberInfoContainer } from './member-info.container';

describe('MemberInfoContainer', () => {
  let component: MemberInfoContainer;
  let fixture: ComponentFixture<MemberInfoContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberInfoContainer
      ],
      providers: [
        MemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
