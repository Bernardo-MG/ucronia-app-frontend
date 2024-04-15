import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { FeeService } from '../../../services/fee.service';
import { FeeInfoEditorComponent } from './fee-info-editor.component';

describe('FeeInfoEditorComponent', () => {
  let component: FeeInfoEditorComponent;
  let fixture: ComponentFixture<FeeInfoEditorComponent>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers', 'getFields']);
    (service as any).getMembers.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FeeInfoEditorComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
