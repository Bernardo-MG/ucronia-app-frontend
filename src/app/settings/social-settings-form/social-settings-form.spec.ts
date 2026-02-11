import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSettingsForm } from './social-settings-form';

describe('ThirdPartySettingsForm', () => {
  let component: SocialSettingsForm;
  let fixture: ComponentFixture<SocialSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialSettingsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialSettingsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
