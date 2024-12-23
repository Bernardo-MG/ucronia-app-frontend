import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeEditionFormComponent } from './fee-edition-form.component';

describe('FeeEditionFormComponent', () => {
  let component: FeeEditionFormComponent;
  let fixture: ComponentFixture<FeeEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeEditionFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
