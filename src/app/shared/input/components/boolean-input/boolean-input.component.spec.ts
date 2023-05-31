import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BooleanInputComponent } from './boolean-input.component';

describe('BooleanInputComponent', () => {
  let component: BooleanInputComponent;
  let fixture: ComponentFixture<BooleanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
         BooleanInputComponent 
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
