import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { MemberCount } from '@ucronia/api';
import { PublicMember } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberView } from './public-member-view';

describe('PublicMemberView', () => {
  let component: PublicMemberView;
  let fixture: ComponentFixture<PublicMemberView>;

  const memberServiceMock = jasmine.createSpyObj<PublicMemberService>(
    'MemberService',
    ['getAll', 'getSummary']
  );

  beforeEach(async () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
