import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '../../../layout/layout.module';
import { DynamicFormBodyComponent } from '../dynamic-form-body/dynamic-form-body.component';
import { FormFrameComponent } from '../form-frame/form-frame.component';
import { EditFormWrapperComponent } from './edit-form-wrapper.component';

describe('DynamicEditFormComponent', () => {
  let component: EditFormWrapperComponent;
  let fixture: ComponentFixture<EditFormWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        ReactiveFormsModule,
        IconsModule
      ],
      declarations: [
        EditFormWrapperComponent,
        FormFrameComponent,
        DynamicFormBodyComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
