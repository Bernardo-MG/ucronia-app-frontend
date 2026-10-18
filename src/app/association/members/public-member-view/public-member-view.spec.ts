import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { MemberCount } from '@ucronia/api';
import { PublicMember } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaClient } from '@ucronia/api';
import { MemberCreation } from '@ucronia/api';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { KeyService } from '@app/settings/key-service';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberView } from './public-member-view';

describe('PublicMemberView', () => {
  let component: PublicMemberView;
  let fixture: ComponentFixture<PublicMemberView>;

  const memberServiceMock = jasmine.createSpyObj<PublicMemberService>(
    'MemberService',
    ['getAll', 'getSummary']
  );

  const auth = { hasPermission: jasmine.createSpy().and.returnValue(true) };
  const member = { create: jasmine.createSpy().and.returnValue(of({})) };
  const options = { getAllAvailable: jasmine.createSpy().and.returnValue(of([])) };

  beforeEach(async () => {
    auth.hasPermission.and.returnValue(true);
    member.create.calls.reset();
    member.create.and.returnValue(of({}));
    options.getAllAvailable.calls.reset();
    memberServiceMock.getAll.and.returnValue(
      of(new Page<PublicMember>())
    );
    memberServiceMock.getSummary.and.returnValue(
      of(new MemberCount())
    );

    await TestBed.configureTestingModule({
      imports: [
        PublicMemberView
      ],
      providers: [
        MessageService,
        { provide: AuthService, useValue: auth },
        { provide: UcroniaClient, useValue: { memberProfile: member } },
        { provide: FeeTypeService, useValue: options },
        { provide: ContactMethodService, useValue: options },
        { provide: KeyService, useValue: options },
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: PublicMemberService, useValue: memberServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('refreshes the current filtered page and counters', () => {
    component.onFilter('Alice');
    component.data.page = 2;
    const response = Object.assign(new Page<PublicMember>(), {
      page: 2, totalPages: 2, content: [new PublicMember()]
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
      page: 3, totalPages: 2, content: []
    });
    const previous = Object.assign(new Page<PublicMember>(), {
      page: 2, totalPages: 2, content: [new PublicMember()]
    });
    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getAll.and.returnValues(of(empty), of(previous));

    component.refresh();

    expect(memberServiceMock.getAll.calls.allArgs().map(args => args[0])).toEqual([3, 2]);
    expect(component.data).toBe(previous);
    expect(component.status.loading).toBeFalse();
  });

  it('hides creation and does not load private options without permission', () => {
    auth.hasPermission.and.returnValue(false);
    const publicFixture = TestBed.createComponent(PublicMemberView);
    publicFixture.detectChanges();
    expect(publicFixture.nativeElement.textContent).not.toContain('Nuevo socio');
    publicFixture.componentInstance.onCreateOpen();
    expect(options.getAllAvailable).not.toHaveBeenCalled();
    expect(member.create).not.toHaveBeenCalled();
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
    expect(member.create).toHaveBeenCalledWith(jasmine.objectContaining({
      feeType: 3, address: 'Address', active: true, renew: true,
      contactChannels: [{ method: 4, detail: 'alice@example.org' }]
    }));
    expect(component.creating).toBeFalse();
    expect(memberServiceMock.getAll).toHaveBeenCalled();
    expect(memberServiceMock.getSummary).toHaveBeenCalled();
  });

  it('keeps the drawer open after a failed save', () => {
    component.onCreateOpen();
    member.create.and.returnValue(throwError(() => new Error('Save failed')));
    const data = new MemberCreation(3, '', { firstName: 'Alice', lastName: '' });
    component.onCreate(data);
    expect(component.creating).toBeTrue();
    expect(component.saving).toBeFalse();
    expect(component.creationError).not.toBe('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
