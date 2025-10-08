import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { SecurityLayout } from './security-layout';

describe('SecurityLayout', () => {
  let component: SecurityLayout;
  let fixture: ComponentFixture<SecurityLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SecurityLayout
      ],
      providers: [
        provideAnimationsAsync(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

