import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeePayFormComponent } from './fee-pay-form.component';

describe('FeePayFormComponent', () => {
  let component: FeePayFormComponent;
  let fixture: ComponentFixture<FeePayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeePayFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
