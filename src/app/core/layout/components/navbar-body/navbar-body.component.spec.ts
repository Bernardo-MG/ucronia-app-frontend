import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { NavbarComponent } from '@app/core/layout/components/navbar/navbar.component';
import { NavbarBodyComponent } from './navbar-body.component';

describe('NavbarBodyComponent', () => {
  let component: NavbarBodyComponent;
  let fixture: ComponentFixture<NavbarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        NavbarBodyComponent,
        NavbarComponent
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
