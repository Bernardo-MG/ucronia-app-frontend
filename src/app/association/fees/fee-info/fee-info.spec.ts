import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FeeService } from '../fee-service';
import { FeeInfo } from './fee-info';

describe('FeeInfo', () => {
  let component: FeeInfo;
  let fixture: ComponentFixture<FeeInfo>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers', 'getFields']);
    (service as any).getMembers.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        FeeInfo
      ],
      providers: [
        { provide: FeeService, useValue: service },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
