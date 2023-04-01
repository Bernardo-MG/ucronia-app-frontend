import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { FormControlsComponent } from '@app/controls/form-controls/form-controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { FeeFormComponent } from '../../components/fee-form/fee-form.component';
import { MemberSelectionComponent } from '../../components/member-selection/member-selection.component';
import { FeeService } from '../../services/fee.service';
import { FeeCreateViewComponent } from './fee-create-view.component';

describe('FeeCreateViewComponent', () => {
  let component: FeeCreateViewComponent;
  let fixture: ComponentFixture<FeeCreateViewComponent>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers']);
    (service as any).getMembers.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        ApiUiModule
      ],
      declarations: [
        FeeCreateViewComponent,
        FormControlsComponent,
        FeeFormComponent,
        MemberSelectionComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
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
