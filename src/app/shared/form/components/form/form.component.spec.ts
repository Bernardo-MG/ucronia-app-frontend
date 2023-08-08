import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        FormComponent
      ],
      providers: [
        FormGroup
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
