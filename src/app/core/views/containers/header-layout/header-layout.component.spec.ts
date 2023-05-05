import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderLayoutComponent } from './header-layout.component';

describe('HeaderLayoutComponent', () => {
  let component: HeaderLayoutComponent;
  let fixture: ComponentFixture<HeaderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderLayoutComponent,
        NavbarComponent
      ],
      providers: [
        SecurityContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
