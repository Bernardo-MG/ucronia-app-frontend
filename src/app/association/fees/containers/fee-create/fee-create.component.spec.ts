import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { EMPTY } from 'rxjs';
import { FeeFormComponent } from '../../components/fee-form/fee-form.component';
import { MemberSelectionComponent } from '../../components/member-selection/member-selection.component';
import { FeeService } from '../../services/fee.service';
import { FeeCreateComponent } from './fee-create.component';

describe('FeeCreateComponent', () => {
  let component: FeeCreateComponent;
  let fixture: ComponentFixture<FeeCreateComponent>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers']);
    (service as any).getMembers.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        LayoutModule
      ],
      declarations: [
        FeeCreateComponent,
        FeeFormComponent,
        MemberSelectionComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
