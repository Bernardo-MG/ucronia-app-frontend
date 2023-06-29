import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { NavbarComponent } from '@app/core/menus/components/navbar/navbar.component';
import { HeaderBodyComponent } from './header-body.component';

describe('HeaderBodyComponent', () => {
  let component: HeaderBodyComponent;
  let fixture: ComponentFixture<HeaderBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        HeaderBodyComponent,
        NavbarComponent
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
