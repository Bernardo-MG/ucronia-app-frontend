import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserEditFormComponent } from './access-user-edit-form.component';

describe('AccessUserEditFormComponent', () => {
  let component: AccessUserEditFormComponent;
  let fixture: ComponentFixture<AccessUserEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        AccessUserEditFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
