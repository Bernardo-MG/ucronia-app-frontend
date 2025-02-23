import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';

@Component({
  selector: 'test-form',
  template: '',
  standalone: true
})
class TestFormComponent extends FormComponent<any> { }

describe('FormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
