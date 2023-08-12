import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { MemberSelectionComponent } from '../../components/member-selection/member-selection.component';
import { FeeService } from '../../services/fee.service';
import { FeeCreationFormComponent } from '../fee-creation-form/fee-creation-form.component';
import { FeeCreateComponent } from './fee-create.component';

describe('FeeCreateComponent', () => {
  let component: FeeCreateComponent;
  let fixture: ComponentFixture<FeeCreateComponent>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers', 'getFields']);
    (service as any).getMembers.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        FeeCreateComponent,
        MemberSelectionComponent,
        FeeCreationFormComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
