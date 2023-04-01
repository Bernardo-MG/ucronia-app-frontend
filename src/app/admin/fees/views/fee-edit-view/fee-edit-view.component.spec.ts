import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControlsComponent } from '@app/controls/form-controls/form-controls.component';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { FeeFormComponent } from '../../components/fee-form/fee-form.component';
import { MemberSelectionComponent } from '../../components/member-selection/member-selection.component';
import { FeeService } from '../../services/fee.service';
import { FeeEditViewComponent } from './fee-edit-view.component';

describe('FeeEditViewComponent', () => {
  let component: FeeEditViewComponent;
  let fixture: ComponentFixture<FeeEditViewComponent>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers']);
    (service as any).getMembers.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        CoreModule
      ],
      declarations: [
        FeeEditViewComponent,
        FormControlsComponent,
        FeeFormComponent,
        MemberSelectionComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
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
