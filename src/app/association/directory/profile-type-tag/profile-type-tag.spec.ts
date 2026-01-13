import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTypeTag } from './profile-type-tag';

describe('ProfileTypeTag', () => {
  let component: ProfileTypeTag;
  let fixture: ComponentFixture<ProfileTypeTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTypeTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTypeTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
