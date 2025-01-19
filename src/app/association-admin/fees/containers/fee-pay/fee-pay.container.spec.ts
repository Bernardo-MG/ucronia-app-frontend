import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { FeeService } from '../../services/fee.service';
import { FeePayContainer } from './fee-pay.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeePayContainer', () => {
  let component: FeePayContainer;
  let fixture: ComponentFixture<FeePayContainer>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getPersons', 'getFields']);
    (service as any).getPersons.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        FeePayContainer],
    providers: [
        { provide: FeeService, useValue: service },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(FeePayContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
