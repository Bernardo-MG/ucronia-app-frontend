import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { FeeEditFormComponent } from '../fee-edit-form/fee-edit-form.component';
import { FeeInfoComponent } from '../../components/fee-info/fee-info.component';
import { MemberSelectionComponent } from '../../components/member-selection/member-selection.component';
import { FeeService } from '../../services/fee.service';
import { FeeDetailsComponent } from './fee-details.component';

describe('FeeDetailsComponent', () => {
  let component: FeeDetailsComponent;
  let fixture: ComponentFixture<FeeDetailsComponent>;
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
        IconsModule,
        LayoutModule,
        HttpClientTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        FeeDetailsComponent,
        MemberSelectionComponent,
        FeeEditFormComponent,
        FeeInfoComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
