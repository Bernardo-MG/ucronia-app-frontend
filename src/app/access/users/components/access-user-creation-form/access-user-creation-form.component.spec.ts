import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserCreationFormComponent } from './access-user-creation-form.component';

describe('AccessUserCreationFormComponent', () => {
  let component: AccessUserCreationFormComponent;
  let fixture: ComponentFixture<AccessUserCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        AccessUserCreationFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
