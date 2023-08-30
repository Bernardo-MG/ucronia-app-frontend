import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { FeeService } from '../../services/fee.service';
import { FeePayFormComponent } from '../fee-pay-form/fee-pay-form.component';
import { MemberSelectionComponent } from '../member-selection/member-selection.component';
import { FeePayComponent } from './fee-pay.component';

describe('FeePayComponent', () => {
  let component: FeePayComponent;
  let fixture: ComponentFixture<FeePayComponent>;
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
        FontAwesomeModule,
        HttpClientTestingModule,
        PaginationModule
      ],
      declarations: [
        FeePayComponent,
        MemberSelectionComponent,
        FeePayFormComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});