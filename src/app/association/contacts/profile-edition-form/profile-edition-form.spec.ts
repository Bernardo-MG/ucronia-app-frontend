import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { ProfileEditionForm } from './profile-edition-form';

describe('ProfileEditionForm', () => {
  let component: ContactEditionForm;
  let fixture: ComponentFixture<ContactEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactEditionForm
      ],
      providers: [
        ConfirmationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
