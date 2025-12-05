import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MemberService } from '../member-service';
import { MemberView } from './member-view';

describe('MemberView', () => {
  let component: MemberView;
  let fixture: ComponentFixture<MemberView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberView
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

    fixture = TestBed.createComponent(MemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
