import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartySettingsForm } from './third-party-settings-form';

describe('ThirdPartySettingsForm', () => {
  let component: ThirdPartySettingsForm;
  let fixture: ComponentFixture<ThirdPartySettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPartySettingsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPartySettingsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
