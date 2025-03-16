import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonStatusSelectComponent } from './person-status-select.component';

describe('PersonStatusSelectComponent', () => {
  let component: PersonStatusSelectComponent;
  let fixture: ComponentFixture<PersonStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonStatusSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
