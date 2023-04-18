import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AcessRegisterFormComponent } from './access-register-form.component';

describe('AcessRegisterFormComponent', () => {
  let component: AcessRegisterFormComponent;
  let fixture: ComponentFixture<AcessRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ AcessRegisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
