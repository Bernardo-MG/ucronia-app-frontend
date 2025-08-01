import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { SecurityLayoutContainer } from './security-layout.container';

describe('SecurityLayoutContainer', () => {
  let component: SecurityLayoutContainer;
  let fixture: ComponentFixture<SecurityLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SecurityLayoutContainer
      ],
      providers: [
        provideAnimationsAsync(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

