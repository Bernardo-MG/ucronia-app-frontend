import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { ContactMethod, FeeType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { DirectoryService } from '../directory-service';
import { DirectorySummaryService } from '../directory-summary-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { MembershipEvolutionService } from '../membership-evolution-service';
import { DirectorySummary } from '../model/directory-summary';
import { FullProfile } from '../model/full-profile';
import { DirectoryView } from './directory-view';

describe('DirectoryView', () => {
  let component: DirectoryView;
  let fixture: ComponentFixture<DirectoryView>;

  const directoryServiceMock = {
    getOne: vi.fn(
    ).mockName("DirectoryService.getOne"),
    getAll: vi.fn().mockName("DirectoryService.getAll"), create: vi.fn().mockName("DirectoryService.create"), update: vi.fn().mockName("DirectoryService.update"), delete: vi.fn(
  ).mockName("DirectoryService.delete")
};

  const directorySummaryServiceMock = {
    getSummary: vi.fn(

  ).mockName("DirectorySummaryService.getSummary")
};

  const contactMethodServiceMock = {
    getAll: vi.fn(
    ).mockName("ContactMethodService.getAll"),
    getAllAvailable: vi.fn(
  ).mockName("ContactMethodService.getAllAvailable")
};

  const feeTypeServiceMock = {
    getAll: vi.fn(
    ).mockName("FeeTypeService.getAll"),
    getAllAvailable: vi.fn(
  ).mockName("FeeTypeService.getAllAvailable")
};

  const membershipEvolutionServiceMock = {
    monthly: vi.fn(

  ).mockName("MembershipEvolutionService.monthly")
};

  beforeEach(async () => {
    directoryServiceMock.getAll.mockReturnValue(
      of(new Page<FullProfile>())
    );
    directorySummaryServiceMock.getSummary.mockReturnValue(
      of(new DirectorySummary())
    );
    contactMethodServiceMock.getAll.mockReturnValue(
      of(new Page<ContactMethod>())
    );
    feeTypeServiceMock.getAll.mockReturnValue(
      of(new Page<FeeType>())
    );
    contactMethodServiceMock.getAll.mockReturnValue(
      of(new Page<ContactMethod>())
    );
    membershipEvolutionServiceMock.monthly.mockReturnValue(
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

  it('should load profile editing options without key assignment controls', () => {
    const profile = new FullProfile();
    directoryServiceMock.getOne.mockReturnValue(of(profile));
    contactMethodServiceMock.getAllAvailable.mockReturnValue(of([]));
    feeTypeServiceMock.getAllAvailable.mockReturnValue(of([]));

    component.onShowEdit();

    expect(directoryServiceMock.getOne).toHaveBeenCalled();
    expect(component.feeTypes).toEqual([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
