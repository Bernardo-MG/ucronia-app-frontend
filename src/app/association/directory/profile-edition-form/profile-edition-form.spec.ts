import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { ProfileEditionForm } from './profile-edition-form';

describe('ProfileEditionForm', () => {
  let component: ProfileEditionForm;
  let fixture: ComponentFixture<ProfileEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileEditionForm
      ],
      providers: [
        ConfirmationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
