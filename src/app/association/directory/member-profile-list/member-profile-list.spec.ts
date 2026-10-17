import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { FullProfile } from '../model/full-profile';
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

  it('shows the member number while retaining the profile used by actions', () => {
    const profile = Object.assign(new FullProfile(), { number: 812, memberNumber: 37 });
    fixture.componentRef.setInput('profiles', [profile]);
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('tbody td');
    expect(cells[0].textContent.trim()).toBe('#37');
    const show = spyOn(component.show, 'emit');
    fixture.nativeElement.querySelector('tbody button').click();
    expect(show).toHaveBeenCalledWith(profile);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
