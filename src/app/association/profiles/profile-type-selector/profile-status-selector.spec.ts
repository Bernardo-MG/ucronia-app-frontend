import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStatusSelector } from './profile-status-selector';

describe('ProfileStatusSelector', () => {
  let component: ProfileStatusSelector;
  let fixture: ComponentFixture<ProfileStatusSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStatusSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStatusSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
