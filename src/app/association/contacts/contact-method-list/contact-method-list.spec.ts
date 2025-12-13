import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactMethodList } from './contact-method-list';

describe('ContactMethodList', () => {
  let component: ContactMethodList;
  let fixture: ComponentFixture<ContactMethodList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMethodList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMethodList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
