import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { FeeCalendarComponent } from '../../../membership/components/fee-calendar/fee-calendar.component';
import { FeeFrontpageComponent } from './fee-frontpage.component';

describe('FeeFrontpageComponent', () => {
  let component: FeeFrontpageComponent;
  let fixture: ComponentFixture<FeeFrontpageComponent>;

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
        FeeFrontpageComponent,
        FeeCalendarComponent
      ],
      providers: [
        FeeCalendarService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
