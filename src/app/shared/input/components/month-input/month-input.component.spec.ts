import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MonthInputComponent } from './month-input.component';

describe('MonthInputComponent', () => {
  let component: MonthInputComponent;
  let fixture: ComponentFixture<MonthInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ 
        MonthInputComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
