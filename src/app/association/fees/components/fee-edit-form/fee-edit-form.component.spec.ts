import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeEditFormComponent } from './fee-edit-form.component';

describe('FeeEditFormComponent', () => {
  let component: FeeEditFormComponent;
  let fixture: ComponentFixture<FeeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule,
        IconsModule
      ],
      declarations: [
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
