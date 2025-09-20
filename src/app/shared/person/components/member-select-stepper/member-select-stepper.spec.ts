import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MemberSelectStepper } from './member-select-stepper';

describe('MemberSelectStepper', () => {
  let component: MemberSelectStepper;
  let fixture: ComponentFixture<MemberSelectStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberSelectStepper
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberSelectStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
