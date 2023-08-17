import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserActivateUserFormComponent } from './user-activate-user-form.component';

describe('UserActivateUserFormComponent', () => {
  let component: UserActivateUserFormComponent;
  let fixture: ComponentFixture<UserActivateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ 
        UserActivateUserFormComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
