import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FeeCreationStepper } from './fee-creation-stepper';

describe('FeeCreationStepper', () => {
  let component: FeeCreationStepper;
  let fixture: ComponentFixture<FeeCreationStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeCreationStepper
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreationStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
