import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { MemberContactList } from './member-contact-list';

describe('MemberContactList', () => {
  let component: MemberContactList;
  let fixture: ComponentFixture<MemberContactList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberContactList
      ],
      providers: [
        ConfirmationService,
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberContactList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
