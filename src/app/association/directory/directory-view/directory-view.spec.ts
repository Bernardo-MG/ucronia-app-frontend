import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { ContactMethod, FeeType, Key } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { DirectoryService } from '../directory-service';
import { DirectorySummaryService } from '../directory-summary-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { MemberKeyService } from '@app/association/members/member-key-service';
import { MembershipEvolutionService } from '../membership-evolution-service';
import { DirectorySummary } from '../model/directory-summary';
import { FullProfile } from '../model/full-profile';
import { DirectoryView } from './directory-view';

describe('DirectoryView', () => {
  let component: DirectoryView;
  let fixture: ComponentFixture<DirectoryView>;

  const keyServiceMock = jasmine.createSpyObj<MemberKeyService>(
    'MemberKeyService',
    ['getAllAvailable']
  );

  const directoryServiceMock = jasmine.createSpyObj<DirectoryService>(
    'DirectoryService',
    ['getOne', 'getAll', 'create', 'update', 'delete']
  );

  const directorySummaryServiceMock = jasmine.createSpyObj<DirectorySummaryService>(
    'DirectorySummaryService',
    ['getSummary']
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
      of(new Page<FullProfile>())
    );
    directorySummaryServiceMock.getSummary.and.returnValue(
      of(new DirectorySummary())
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
    keyServiceMock.getAllAvailable.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        DirectoryView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: MemberKeyService, useValue: keyServiceMock },
        { provide: DirectoryService, useValue: directoryServiceMock },
        { provide: DirectorySummaryService, useValue: directorySummaryServiceMock },
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

  it('should load key assignment options from the members service when editing a profile', () => {
    const profile = new FullProfile();
    const key = Object.assign(new Key(), { number: 7 });
    directoryServiceMock.getOne.and.returnValue(of(profile));
    contactMethodServiceMock.getAllAvailable.and.returnValue(of([]));
    feeTypeServiceMock.getAllAvailable.and.returnValue(of([]));
    keyServiceMock.getAllAvailable.calls.reset();
    keyServiceMock.getAllAvailable.and.returnValue(of([key]));

    component.onShowEdit();

    expect(keyServiceMock.getAllAvailable).toHaveBeenCalledTimes(1);
    expect(component.keys).toEqual([key]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
