import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MemberService } from '../member-service';
import { MemberListing } from './member-listing';

describe('MemberListing', () => {
  let component: MemberListing;
  let fixture: ComponentFixture<MemberListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberListing
      ],
      providers: [
        MemberService,
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
