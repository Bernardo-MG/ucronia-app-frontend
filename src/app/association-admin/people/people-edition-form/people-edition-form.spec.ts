import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleEditionForm } from './people-edition-form';

describe('PeopleEditionForm', () => {
  let component: PeopleEditionForm;
  let fixture: ComponentFixture<PeopleEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleEditionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
