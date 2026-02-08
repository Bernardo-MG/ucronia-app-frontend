import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { ContactMethod, FeeType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ContactMethodService } from '../contact-method-service';
import { DirectoryReportService } from '../directory-report-service';
import { DirectoryService } from '../directory-service';
import { FeeTypeService } from '../fee-type-service';
import { MembershipEvolutionService } from '../membership-evolution-service';
import { DirectoryReport } from '../model/directory-status-report';
import { ProfileInfo } from '../model/profile-info';
import { DirectoryView } from './directory-view';

describe('DirectoryView', () => {
  let component: DirectoryView;
  let fixture: ComponentFixture<DirectoryView>;

  const directoryServiceMock = jasmine.createSpyObj<DirectoryService>(
    'DirectoryService',
    ['getOne', 'getAll', 'create', 'update', 'delete']
  );

  const directoryReportServiceMock = jasmine.createSpyObj<DirectoryReportService>(
    'DirectoryReportService',
    ['getReport']
  );

  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>(
    'ContactMethodService',
    ['getAll', 'getAllAvailable']
  );

  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>(
    'FeeTypeService',
    ['getAll', 'getAllAvailable']
  );

  const membershipEvolutionServiceMock = jasmine.createSpyObj<MembershipEvolutionService>(
    'MembershipEvolutionService',
    ['monthly']
  );

  beforeEach(async () => {
    directoryServiceMock.getAll.and.returnValue(
      of(new Page<ProfileInfo>())
    );
    directoryReportServiceMock.getReport.and.returnValue(
      of(new DirectoryReport())
    );
    contactMethodServiceMock.getAll.and.returnValue(
      of(new Page<ContactMethod>())
    );
    feeTypeServiceMock.getAll.and.returnValue(
      of(new Page<FeeType>())
    );
    contactMethodServiceMock.getAll.and.returnValue(
      of(new Page<ContactMethod>())
    );
    membershipEvolutionServiceMock.monthly.and.returnValue(
      of([])
    );

    await TestBed.configureTestingModule({
      imports: [
        DirectoryView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: DirectoryService, useValue: directoryServiceMock },
        { provide: DirectoryReportService, useValue: directoryReportServiceMock },
        { provide: ContactMethodService, useValue: contactMethodServiceMock },
        { provide: FeeTypeService, useValue: feeTypeServiceMock },
        { provide: MembershipEvolutionService, useValue: membershipEvolutionServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DirectoryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
