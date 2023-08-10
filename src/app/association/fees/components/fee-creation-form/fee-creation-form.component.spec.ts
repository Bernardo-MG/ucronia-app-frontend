import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCreationFormComponent } from './fee-creation-form.component';

describe('FeeCreationFormComponent', () => {
  let component: FeeCreationFormComponent;
  let fixture: ComponentFixture<FeeCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        LayoutModule
      ],
      declarations: [
        FeeCreationFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
