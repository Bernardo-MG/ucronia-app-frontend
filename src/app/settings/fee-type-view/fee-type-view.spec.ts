import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FeeTypeService } from '../fee-type-service';
import { Page } from '@bernardo-mg/request';
import { FeeType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { FeeTypeView } from './fee-type-view';

describe('FeeTypeView', () => {
  let component: FeeTypeView;
  let fixture: ComponentFixture<FeeTypeView>;

  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>(
    'FeeTypeService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {
    feeTypeServiceMock.getAll.and.returnValue(
      of(new Page<FeeType>())
    );

    await TestBed.configureTestingModule({
      imports: [FeeTypeView],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: FeeTypeService, useValue: feeTypeServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeTypeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
