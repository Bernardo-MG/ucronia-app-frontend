import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { ProfileInfoEditionForm } from './profile-info-edition-form';

describe('ProfileInfoEditionForm', () => {
  let component: ProfileInfoEditionForm;
  let fixture: ComponentFixture<ProfileInfoEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileInfoEditionForm
      ],
      providers: [
        ConfirmationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileInfoEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
