import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserEditionFormComponent } from './access-user-edition-form.component';

describe('AccessUserFormComponent', () => {
  let component: AccessUserEditionFormComponent;
  let fixture: ComponentFixture<AccessUserEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        AccessUserEditionFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
