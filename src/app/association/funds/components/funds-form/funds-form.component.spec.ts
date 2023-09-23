import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FundsFormComponent } from './funds-form.component';

describe('FundsFormComponent', () => {
  let component: FundsFormComponent;
  let fixture: ComponentFixture<FundsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        FundsFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FundsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
