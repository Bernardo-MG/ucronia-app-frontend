import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MemberProfileDetails } from './member-profile-details';

describe('MemberProfileDetails', () => {
  let component: MemberProfileDetails;
  let fixture: ComponentFixture<MemberProfileDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberProfileDetails
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberProfileDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
