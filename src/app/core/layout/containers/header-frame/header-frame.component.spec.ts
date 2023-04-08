import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderFrameComponent } from './header-frame.component';

describe('HeaderFrameComponent', () => {
  let component: HeaderFrameComponent;
  let fixture: ComponentFixture<HeaderFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderFrameComponent,
        NavbarComponent
      ],
      providers: [
        AuthenticationContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
