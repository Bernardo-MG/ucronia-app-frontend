import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleCreationForm } from './people-creation-form';

describe('PeopleCreationForm', () => {
  let component: PeopleCreationForm;
  let fixture: ComponentFixture<PeopleCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleCreationForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
