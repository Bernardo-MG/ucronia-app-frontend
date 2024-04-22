import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeEditFormComponent } from './fee-edit-form.component';

describe('FeeEditFormComponent', () => {
  let component: FeeEditFormComponent;
  let fixture: ComponentFixture<FeeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeEditFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
