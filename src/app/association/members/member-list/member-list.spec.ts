import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberService } from '@app/association/members/member-service';
import { MemberList } from './member-list';

describe('MemberList', () => {
  let component: MemberList;
  let fixture: ComponentFixture<MemberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberList
      ],
      providers: [
        MemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
