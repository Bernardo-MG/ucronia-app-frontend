import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeTag } from './contact-type-tag';

describe('ContactTypeTag', () => {
  let component: ContactTypeTag;
  let fixture: ComponentFixture<ContactTypeTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypeTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTypeTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
