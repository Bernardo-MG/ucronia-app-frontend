import { ComponentFixture, TestBed } from '@angular/core/testing';
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

