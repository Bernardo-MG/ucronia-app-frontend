import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeEditionForm } from './fee-edition-form';

describe('FeeEditionForm', () => {
  let component: FeeEditionForm;
  let fixture: ComponentFixture<FeeEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeEditionForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
