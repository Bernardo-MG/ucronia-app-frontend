import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditionModule } from '@app/shared/edition/edition.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { EMPTY } from 'rxjs';
import { MemberSelectionComponent } from '../../components/member-selection/member-selection.component';
import { FeeService } from '../../services/fee.service';
import { FeeEditComponent } from './fee-edit.component';

describe('FeeEditComponent', () => {
  let component: FeeEditComponent;
  let fixture: ComponentFixture<FeeEditComponent>;
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
        LayoutModule,
        EditionModule
      ],
      declarations: [
        FeeEditComponent,
        MemberSelectionComponent
      ],
      providers: [
        { provide: FeeService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
