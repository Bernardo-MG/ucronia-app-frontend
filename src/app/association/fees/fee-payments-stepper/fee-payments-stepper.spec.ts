import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FeePaymentsStepper } from './fee-payments-stepper';

describe('FeePaymentsStepper', () => {
  let component: FeePaymentsStepper;
  let fixture: ComponentFixture<FeePaymentsStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeePaymentsStepper
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentsStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
