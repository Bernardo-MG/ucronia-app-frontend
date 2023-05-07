import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { DynamicFormBodyComponent } from '../dynamic-form-body/dynamic-form-body.component';
import { FormFrameComponent } from '../form-frame/form-frame.component';
import { DynamicEditFormComponent } from './dynamic-edit-form.component';

describe('DynamicEditFormComponent', () => {
  let component: DynamicEditFormComponent;
  let fixture: ComponentFixture<DynamicEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        ReactiveFormsModule
      ],
      declarations: [
        DynamicEditFormComponent,
        FormFrameComponent,
        DynamicFormBodyComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
