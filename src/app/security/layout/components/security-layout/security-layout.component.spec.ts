import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SecurityLayoutComponent } from './security-layout.component';

describe('SecurityLayoutComponent', () => {
  let component: SecurityLayoutComponent;
  let fixture: ComponentFixture<SecurityLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavbarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
