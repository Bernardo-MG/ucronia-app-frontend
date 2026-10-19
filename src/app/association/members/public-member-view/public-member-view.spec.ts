import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { KeyService } from '@app/settings/key-service';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { MemberCount, MemberCreation, UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { Member, PublicMember } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { MemberKeyService } from '../member-key-service';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberView } from './public-member-view';

describe('PublicMemberView', () => {
  let component: PublicMemberView;
  let fixture: ComponentFixture<PublicMemberView>;

  const memberServiceMock = jasmine.createSpyObj<PublicMemberService>('MemberService', ['getAll', 'getSummary']);
  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
  const memberEndpointMock = jasmine.createSpyObj<UcroniaClient['memberProfile']>('MemberEndpoint', ['create']);
  const memberKeyServiceMock = jasmine.createSpyObj<MemberKeyService>('MemberKeyService', ['getAll']);
  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>('FeeTypeService', ['getAllAvailable']);
  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>('ContactMethodService', [
    'getAllAvailable'
  ]);
  const keyServiceMock = jasmine.createSpyObj<KeyService>('KeyService', ['getAllAvailable']);

  beforeEach(async () => {
    authServiceMock.hasPermission.and.returnValue(true);
    memberEndpointMock.create.calls.reset();
    memberEndpointMock.create.and.returnValue(of(new Member()));
    feeTypeServiceMock.getAllAvailable.calls.reset();
    contactMethodServiceMock.getAllAvailable.calls.reset();
    keyServiceMock.getAllAvailable.calls.reset();
    feeTypeServiceMock.getAllAvailable.and.returnValue(of([]));
    contactMethodServiceMock.getAllAvailable.and.returnValue(of([]));
    keyServiceMock.getAllAvailable.and.returnValue(of([]));
    memberKeyServiceMock.getAll.calls.reset();
    memberKeyServiceMock.getAll.and.returnValue(of([]));
    memberServiceMock.getAll.and.returnValue(of(new Page<PublicMember>()));
    memberServiceMock.getSummary.and.returnValue(of(new MemberCount()));

    await TestBed.configureTestingModule({
      imports: [PublicMemberView],
      providers: [
        MessageService,
        { provide: MemberKeyService, useValue: memberKeyServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: UcroniaClient, useValue: { memberProfile: memberEndpointMock } },
        { provide: FeeTypeService, useValue: feeTypeServiceMock },
        { provide: ContactMethodService, useValue: contactMethodServiceMock },
        { provide: KeyService, useValue: keyServiceMock },
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: PublicMemberService, useValue: memberServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('refreshes the current filtered page and counters', () => {
    component.onFilter('Alice');
    component.data.page = 2;
    const response = Object.assign(new Page<PublicMember>(), {
      page: 2,
      totalPages: 2,
      content: [new PublicMember()]
    });

    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getSummary.calls.reset();
    memberServiceMock.getAll.and.returnValue(of(response));
    memberServiceMock.getSummary.and.returnValue(of({ active: 8, renew: 6 }));
    component.refresh();

    expect(memberServiceMock.getAll).toHaveBeenCalledWith(2, jasmine.anything(), 'Alice');
    expect(memberServiceMock.getSummary).toHaveBeenCalledTimes(1);
    expect(component.data).toBe(response);
    expect(component.active).toBe(8);
    expect(component.notRenewing).toBe(2);
  });

  it('loads the last available page when the refreshed page is empty', () => {
    component.data.page = 3;
    const empty = Object.assign(new Page<PublicMember>(), {
      page: 3,
      totalPages: 2,
      content: []
    });
    const previous = Object.assign(new Page<PublicMember>(), {
      page: 2,
      totalPages: 2,
      content: [new PublicMember()]
    });

    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getAll.and.returnValues(of(empty), of(previous));
    component.refresh();

    expect(memberServiceMock.getAll.calls.allArgs().map(args => args[0])).toEqual([3, 2]);
    expect(component.data).toBe(previous);
    expect(component.status.loading).toBeFalse();
  });

  it('hides creation and does not load private options without permission', () => {
    authServiceMock.hasPermission.and.returnValue(false);
    const publicFixture = TestBed.createComponent(PublicMemberView);

    publicFixture.detectChanges();

    expect(publicFixture.nativeElement.textContent).not.toContain('Nuevo socio');

    publicFixture.componentInstance.onCreateOpen();

    expect(feeTypeServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(contactMethodServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(keyServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(memberEndpointMock.create).not.toHaveBeenCalled();

    publicFixture.destroy();
  });

  it('creates a full member and refreshes the public data', () => {
    component.onCreateOpen();
    const data = new MemberCreation(3, '', { firstName: 'Alice', lastName: '' });

    data.address = 'Address';
    data.active = true;
    data.renew = true;
    data.contactChannels = [{ method: 4, detail: 'alice@example.org' }];
    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getSummary.calls.reset();
    component.onCreate(data);

    expect(memberEndpointMock.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        feeType: 3,
        address: 'Address',
        active: true,
        renew: true,
        contactChannels: [{ method: 4, detail: 'alice@example.org' }]
      })
    );
    expect(component.creating).toBeFalse();
    expect(memberServiceMock.getAll).toHaveBeenCalled();
    expect(memberServiceMock.getSummary).toHaveBeenCalled();
  });

  it('keeps the drawer open after a failed save', () => {
    component.onCreateOpen();
    memberEndpointMock.create.and.returnValue(throwError(() => new Error('Save failed')));
    const data = new MemberCreation(3, '', { firstName: 'Alice', lastName: '' });

    component.onCreate(data);

    expect(component.creating).toBeTrue();
    expect(component.saving).toBeFalse();
    expect(component.creationError).not.toBe('');
  });

  it('should load keys only when the authorized keys tab is selected', () => {
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    component.onTabChange('keys');
    fixture.detectChanges();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should hide the keys tab and reject forced selection without key read permission', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.key.read);
    const restrictedFixture = TestBed.createComponent(PublicMemberView);

    restrictedFixture.detectChanges();
    restrictedFixture.componentInstance.onTabChange('keys');
    restrictedFixture.detectChanges();

    expect(restrictedFixture.nativeElement.querySelector('p-tab[value="keys"]')).toBeNull();
    expect(restrictedFixture.componentInstance.selectedTab).toBe('members');
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    restrictedFixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
