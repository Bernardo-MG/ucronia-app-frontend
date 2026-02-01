import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { ContactMethod } from '@bernardo-mg/security';
import { FeeType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ContactMethodService } from '../contact-method-service';
import { FeeTypeService } from '../fee-type-service';
import { MembershipEvolutionService } from '../membership-evolution-service';
import { ProfileInfo } from '../model/profile-info';
import { ProfilesService } from '../profiles-service';
import { DirectoryView } from './directory-view';

describe('DirectoryView', () => {
  let component: DirectoryView;
  let fixture: ComponentFixture<DirectoryView>;

  const profileServiceMock = jasmine.createSpyObj<ProfilesService>(
    'ProfilesService',
    ['getOne', 'getAll', 'create', 'update', 'delete', 'convertToMember', 'convertToGuest', 'convertToSponsor']
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
    profileServiceMock.getAll.and.returnValue(
      of(new Page<ProfileInfo>())
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
        { provide: ProfilesService, useValue: profileServiceMock },
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
