import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonStatusSelect } from './person-status-select';

describe('PersonStatusSelect', () => {
  let component: PersonStatusSelect;
  let fixture: ComponentFixture<PersonStatusSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonStatusSelect]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonStatusSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
