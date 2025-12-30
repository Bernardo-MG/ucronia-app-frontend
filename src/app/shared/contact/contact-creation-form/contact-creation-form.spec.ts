import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCreationForm } from './contact-creation-form';

describe('ProfileCreationForm', () => {
  let component: ProfileCreationForm;
  let fixture: ComponentFixture<ProfileCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCreationForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
