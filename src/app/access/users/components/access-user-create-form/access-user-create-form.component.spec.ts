import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserCreateFormComponent } from './access-user-create-form.component';

describe('AccessUserCreateFormComponent', () => {
  let component: AccessUserCreateFormComponent;
  let fixture: ComponentFixture<AccessUserCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        AccessUserCreateFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
