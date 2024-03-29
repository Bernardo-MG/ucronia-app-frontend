import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { NavbarComponent } from '@app/core/layout/components/navbar/navbar.component';
import { MainNavigationLayoutComponent } from './main-navigation-layout.component';

describe('MainNavigationLayoutComponent', () => {
  let component: MainNavigationLayoutComponent;
  let fixture: ComponentFixture<MainNavigationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NavbarComponent
      ],
      providers: [
        AuthContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainNavigationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
