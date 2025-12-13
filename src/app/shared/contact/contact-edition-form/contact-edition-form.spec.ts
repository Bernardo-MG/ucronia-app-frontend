import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactEditionForm } from './contact-edition-form';

describe('ContactEditionForm', () => {
  let component: ContactEditionForm;
  let fixture: ComponentFixture<ContactEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEditionForm]
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
