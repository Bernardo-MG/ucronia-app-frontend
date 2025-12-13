import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMethodForm } from './contact-method-form';

describe('ContactMethodForm', () => {
  let component: ContactMethodForm;
  let fixture: ComponentFixture<ContactMethodForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMethodForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMethodForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
