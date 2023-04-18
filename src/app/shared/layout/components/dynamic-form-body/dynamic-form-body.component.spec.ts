import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormBodyComponent } from './dynamic-form-body.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DynamicFormBodyComponent', () => {
  let component: DynamicFormBodyComponent;
  let fixture: ComponentFixture<DynamicFormBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DynamicFormBodyComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
