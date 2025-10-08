import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeCreationForm } from './fee-creation-form';

describe('FeeCreationForm', () => {
  let component: FeeCreationForm;
  let fixture: ComponentFixture<FeeCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeCreationForm]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
