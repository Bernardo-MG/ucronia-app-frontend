import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LayoutHeaderFrameComponent } from './layout-header-frame.component';

describe('LayoutHeaderFrameComponent', () => {
  let component: LayoutHeaderFrameComponent;
  let fixture: ComponentFixture<LayoutHeaderFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LayoutHeaderFrameComponent,
        NavbarComponent
      ],
      providers: [
        AuthenticationContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutHeaderFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
