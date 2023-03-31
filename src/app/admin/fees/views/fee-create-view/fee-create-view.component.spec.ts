import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControlsComponent } from '@app/controls/form-controls/form-controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeFormComponent } from '../../components/fee-form/fee-form.component';
import { FeeService } from '../../services/fee.service';
import { FeeCreateViewComponent } from './fee-create-view.component';

describe('FeeCreateViewComponent', () => {
  let component: FeeCreateViewComponent;
  let fixture: ComponentFixture<FeeCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        FeeCreateViewComponent,
        FormControlsComponent,
        FeeFormComponent
      ],
      providers: [
        FeeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
