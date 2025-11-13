import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberInfo } from './public-member-info';

describe('PublicMemberInfo', () => {
  let component: PublicMemberInfo;
  let fixture: ComponentFixture<PublicMemberInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PublicMemberInfo
      ],
      providers: [
        PublicMemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicMemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
