import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MemberService } from '@app/association/members/member-service';
import { MemberInfo } from './member-info';

describe('MemberInfo', () => {
  let component: MemberInfo;
  let fixture: ComponentFixture<MemberInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberInfo
      ],
      providers: [
        MemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
