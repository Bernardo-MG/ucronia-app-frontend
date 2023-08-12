import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeFormComponent } from './fee-form.component';

describe('FeeFormComponent', () => {
  let component: FeeFormComponent;
  let fixture: ComponentFixture<FeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        LayoutModule
      ],
      declarations: [
        FeeFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
