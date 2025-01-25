import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FeeService } from '../../services/fee.service';
import { FeeEditionContainer } from './fee-edition.container';

describe('FeeEditionContainer', () => {
  let component: FeeEditionContainer;
  let fixture: ComponentFixture<FeeEditionContainer>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers', 'getFields']);
    (service as any).getMembers.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        FeeEditionContainer
      ],
      providers: [
        { provide: FeeService, useValue: service },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
