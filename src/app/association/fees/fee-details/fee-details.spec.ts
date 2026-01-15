import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FeeService } from '../fee-service';
import { FeeDetails } from './fee-details';

describe('FeeDetails', () => {
  let component: FeeDetails;
  let fixture: ComponentFixture<FeeDetails>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers', 'getFields']);
    (service as any).getMembers.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        FeeDetails
      ],
      providers: [
        { provide: FeeService, useValue: service },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
