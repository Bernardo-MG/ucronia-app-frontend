import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactCreationForm } from './contact-creation-form';

describe('ContactCreationForm', () => {
  let component: ContactCreationForm;
  let fixture: ComponentFixture<ContactCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCreationForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
