import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCreateFormComponent } from './fee-create-form.component';

describe('FeeCreateFormComponent', () => {
  let component: FeeCreateFormComponent;
  let fixture: ComponentFixture<FeeCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        LayoutModule
      ],
      declarations: [
        FeeCreateFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
