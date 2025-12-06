import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSettingsForm } from './membership-settings-form';

describe('MembershipSettingsForm', () => {
  let component: MembershipSettingsForm;
  let fixture: ComponentFixture<MembershipSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipSettingsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipSettingsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
