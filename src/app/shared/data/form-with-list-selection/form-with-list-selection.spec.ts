import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormWithListSelection } from './form-with-list-selection';

describe('FormWithListSelection', () => {
  let component: FormWithListSelection;
  let fixture: ComponentFixture<FormWithListSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithListSelection]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormWithListSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
