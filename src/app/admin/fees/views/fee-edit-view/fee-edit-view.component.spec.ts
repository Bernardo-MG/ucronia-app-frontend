import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControlsComponent } from '@app/controls/form-controls/form-controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeFormComponent } from '../../components/fee-form/fee-form.component';
import { FeeService } from '../../services/fee.service';
import { FeeEditViewComponent } from './fee-edit-view.component';

describe('FeeEditViewComponent', () => {
  let component: FeeEditViewComponent;
  let fixture: ComponentFixture<FeeEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        FeeEditViewComponent,
        FormControlsComponent,
        FeeFormComponent
      ],
      providers: [
        FeeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
