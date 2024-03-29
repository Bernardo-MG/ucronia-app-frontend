import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessUserFormComponent } from './access-user-form.component';

describe('AccessUserFormComponent', () => {
  let component: AccessUserFormComponent;
  let fixture: ComponentFixture<AccessUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
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
