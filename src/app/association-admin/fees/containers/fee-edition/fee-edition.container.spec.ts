import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { FeeEditionContainer } from './fee-edition.container';
import { FeeService } from '../../core/services/fee.service';

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
        RouterTestingModule,
        FeeEditionContainer
      ],
      providers: [
        { provide: FeeService, useValue: service }
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
