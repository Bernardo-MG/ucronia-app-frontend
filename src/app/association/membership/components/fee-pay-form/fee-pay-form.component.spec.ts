import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeePayFormComponent } from './fee-pay-form.component';

describe('FeePayFormComponent', () => {
  let component: FeePayFormComponent;
  let fixture: ComponentFixture<FeePayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        LayoutModule
      ],
      declarations: [
        FeePayFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
