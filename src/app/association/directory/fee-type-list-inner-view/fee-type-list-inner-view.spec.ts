import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FeeTypeListInnerView } from './fee-type-list-inner-view';

describe('FeeTypeListInnerView', () => {
  let component: FeeTypeListInnerView;
  let fixture: ComponentFixture<FeeTypeListInnerView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeTypeListInnerView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeTypeListInnerView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
