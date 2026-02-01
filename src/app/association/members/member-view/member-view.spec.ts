import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Member } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { MemberService } from '../member-service';
import { MemberView } from './member-view';

describe('MemberView', () => {
  let component: MemberView;
  let fixture: ComponentFixture<MemberView>;

  const memberServiceMock = jasmine.createSpyObj<MemberService>(
    'MemberService',
    ['getAll']
  );

  beforeEach(async () => {
    memberServiceMock.getAll.and.returnValue(
      of(new Page<Member>())
    );

    await TestBed.configureTestingModule({
      imports: [
        MemberView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: MemberService, useValue: memberServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
