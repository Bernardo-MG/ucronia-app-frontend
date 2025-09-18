import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeePayForm } from './fee-pay-form';

describe('FeePayForm', () => {
  let component: FeePayForm;
  let fixture: ComponentFixture<FeePayForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeePayForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePayForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
