import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFailureFeedbackComponent } from './input-failure-feedback.component';

describe('InputFailureFeedbackComponent', () => {
  let component: InputFailureFeedbackComponent;
  let fixture: ComponentFixture<InputFailureFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFailureFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFailureFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
