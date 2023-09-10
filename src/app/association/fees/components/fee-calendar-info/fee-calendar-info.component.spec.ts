import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { FeeCalendarComponent } from '../fee-calendar/fee-calendar.component';
import { FeeCalendarInfoComponent } from './fee-calendar-info.component';

describe('FeeCalendarInfoComponent', () => {
  let component: FeeCalendarInfoComponent;
  let fixture: ComponentFixture<FeeCalendarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        FeeCalendarInfoComponent,
        FeeCalendarComponent
      ],
      providers: [
        FeeCalendarService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
