import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStatusSelector } from './contact-status-selector';

describe('ContactStatusSelector', () => {
  let component: ContactStatusSelector;
  let fixture: ComponentFixture<ContactStatusSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStatusSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactStatusSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
