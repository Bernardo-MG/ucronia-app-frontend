import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { FeeService } from '../fee-service/fee-service';
import { FeeCreateUnpaid } from './fee-create-unpaid';

describe('FeeCreateUnpaid', () => {
  let component: FeeCreateUnpaid;
  let fixture: ComponentFixture<FeeCreateUnpaid>;
  let service: FeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeCreateUnpaid
      ],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreateUnpaid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
