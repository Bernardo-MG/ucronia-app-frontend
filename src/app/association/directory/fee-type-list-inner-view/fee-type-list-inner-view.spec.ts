import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PaginatedResponse } from '@bernardo-mg/request';
import { FeeType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { FeeTypeService } from '../fee-type-service';
import { FeeTypeListInnerView } from './fee-type-list-inner-view';

describe('FeeTypeListInnerView', () => {
  let component: FeeTypeListInnerView;
  let fixture: ComponentFixture<FeeTypeListInnerView>;

  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>(
    'FeeTypeService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {
    feeTypeServiceMock.getAll.and.returnValue(
      of(new PaginatedResponse<FeeType>())
    );

    await TestBed.configureTestingModule({
      imports: [
        FeeTypeListInnerView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: FeeTypeService, useValue: feeTypeServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeTypeListInnerView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
