import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormBodyComponent } from './dynamic-form-body.component';

describe('DynamicFormBodyComponent', () => {
  let component: DynamicFormBodyComponent;
  let fixture: ComponentFixture<DynamicFormBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
