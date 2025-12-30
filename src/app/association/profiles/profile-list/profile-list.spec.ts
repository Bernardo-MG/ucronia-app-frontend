import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { ProfileList } from './profile-list';

describe('ProfileList', () => {
  let component: ProfileList;
  let fixture: ComponentFixture<ProfileList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileList
      ],
      providers: [
        ConfirmationService,
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
