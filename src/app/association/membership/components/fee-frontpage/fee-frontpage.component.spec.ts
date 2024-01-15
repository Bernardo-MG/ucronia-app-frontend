import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeCalendarComponent } from '../../../fees/components/fee-calendar/fee-calendar.component';
import { FeeCalendarService } from '../../../fees/services/fee-calendar.service';
import { FeeFrontpageComponent } from './fee-frontpage.component';

describe('FeeFrontpageComponent', () => {
  let component: FeeFrontpageComponent;
  let fixture: ComponentFixture<FeeFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule
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
