import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSettingsForm } from './contact-settings-form';

describe('ContactSettingsForm', () => {
  let component: ContactSettingsForm;
  let fixture: ComponentFixture<ContactSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSettingsForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactSettingsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
