import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginIconComponent } from './icon-login.component';

describe('LoginIconComponent', () => {
  let component: LoginIconComponent;
  let fixture: ComponentFixture<LoginIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        LoginIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
