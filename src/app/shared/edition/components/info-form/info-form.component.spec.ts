import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { DynamicFormBodyComponent } from '../dynamic-form-body/dynamic-form-body.component';
import { FormFrameComponent } from '../form-frame/form-frame.component';
import { InfoFormComponent } from './info-form.component';

describe('InfoFormComponent', () => {
  let component: InfoFormComponent;
  let fixture: ComponentFixture<InfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        ReactiveFormsModule
      ],
      declarations: [
        InfoFormComponent,
        FormFrameComponent,
        DynamicFormBodyComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
