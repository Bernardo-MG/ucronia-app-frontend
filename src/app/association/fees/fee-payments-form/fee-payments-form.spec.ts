import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeePaymentsForm } from './fee-payments-form';

describe('FeePaymentsForm', () => {
  let component: FeePaymentsForm;
  let fixture: ComponentFixture<FeePaymentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeePaymentsForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
