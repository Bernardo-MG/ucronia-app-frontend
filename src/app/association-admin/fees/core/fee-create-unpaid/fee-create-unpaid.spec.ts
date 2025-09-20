import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FeeService } from '../fee-service/fee-service';
import { FeeCreateUnpaid } from './fee-create-unpaid';

describe('FeeCreateUnpaid', () => {
  let component: FeeCreateUnpaid;
  let fixture: ComponentFixture<FeeCreateUnpaid>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getPersons', 'getFields']);
    (service as any).getPersons.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        FeeCreateUnpaid
      ],
      providers: [
        { provide: FeeService, useValue: service },
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
