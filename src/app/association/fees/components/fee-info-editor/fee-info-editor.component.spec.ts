import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { FeeInfoComponent } from '../fee-info/fee-info.component';
import { FeeService } from '../../services/fee.service';
import { FeeEditFormComponent } from '../fee-edit-form/fee-edit-form.component';
import { FeeMemberSelectionComponent } from '../fee-member-selection/fee-member-selection.component';
import { FeeInfoEditorComponent } from './fee-info-editor.component';

describe('FeeInfoEditorComponent', () => {
  let component: FeeInfoEditorComponent;
  let fixture: ComponentFixture<FeeInfoEditorComponent>;
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
        FeeInfoEditorComponent,
        FeeMemberSelectionComponent,
        FeeEditFormComponent,
        FeeInfoComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
