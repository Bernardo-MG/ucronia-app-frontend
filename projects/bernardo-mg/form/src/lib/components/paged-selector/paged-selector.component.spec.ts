import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagedSelectorComponent } from './paged-selector.component';

@Component({
  selector: 'form-test-paged-selector',
  template: '',
  standalone: true
})
class TestPagedSelectorComponent extends PagedSelectorComponent<any> { }

describe('PagedSelectorComponent', () => {
  let component: TestPagedSelectorComponent;
  let fixture: ComponentFixture<TestPagedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestPagedSelectorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPagedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
