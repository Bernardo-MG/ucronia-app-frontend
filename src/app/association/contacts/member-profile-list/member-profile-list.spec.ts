import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { MemberProfileList } from './member-profile-list';

describe('MemberProfileList', () => {
  let component: MemberProfileList;
  let fixture: ComponentFixture<MemberProfileList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberProfileList
      ],
      providers: [
        ConfirmationService,
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberProfileList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
