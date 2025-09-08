import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormWithSelection } from './form-with-selection';

describe('FormWithSelection', () => {
  let component: FormWithSelection;
  let fixture: ComponentFixture<FormWithSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithSelection]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormWithSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
