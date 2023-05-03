import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditionModule } from '@app/shared/edition/edition.module';
import { AccessUserFormComponent } from './access-user-form.component';

describe('AccessUserFormComponent', () => {
  let component: AccessUserFormComponent;
  let fixture: ComponentFixture<AccessUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        EditionModule
      ],
      declarations: [
        AccessUserFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
