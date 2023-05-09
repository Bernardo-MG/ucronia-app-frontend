import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { DynamicFormBodyComponent } from '../dynamic-form-body/dynamic-form-body.component';
import { FormFrameComponent } from '../form-frame/form-frame.component';
import { DynamicInfoFormComponent } from './dynamic-info-form.component';

describe('DynamicInfoFormComponent', () => {
  let component: DynamicInfoFormComponent;
  let fixture: ComponentFixture<DynamicInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        ReactiveFormsModule
      ],
      declarations: [
        DynamicInfoFormComponent,
        FormFrameComponent,
        DynamicFormBodyComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
