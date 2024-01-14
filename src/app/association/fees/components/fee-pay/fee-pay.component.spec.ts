import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { EMPTY } from 'rxjs';
import { FeeService } from '../../../membership/services/fee.service';
import { FeeMemberSelectionComponent } from '../fee-member-selection/fee-member-selection.component';
import { FeePayFormComponent } from '../fee-pay-form/fee-pay-form.component';
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
        HttpClientTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        FeePayComponent,
        FeeMemberSelectionComponent,
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
