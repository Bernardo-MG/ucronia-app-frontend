import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MemberService } from '../member-service';
import { MemberContactDetails } from './member-contact-details';

describe('MemberContactDetails', () => {
  let component: MemberContactDetails;
  let fixture: ComponentFixture<MemberContactDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberContactDetails
      ],
      providers: [
        MemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberContactDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
