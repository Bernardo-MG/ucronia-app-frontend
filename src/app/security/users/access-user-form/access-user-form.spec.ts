import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessUserForm } from './access-user-form';

describe('AccessUserForm', () => {
  let component: AccessUserForm;
  let fixture: ComponentFixture<AccessUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AccessUserForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
