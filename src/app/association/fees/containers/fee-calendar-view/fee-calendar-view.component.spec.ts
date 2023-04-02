import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeTabsComponent } from '../../components/fee-tabs/fee-tabs.component';
import { FeeCalendarViewComponent } from './fee-calendar-view.component';

describe('FeeCalendarViewComponent', () => {
  let component: FeeCalendarViewComponent;
  let fixture: ComponentFixture<FeeCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        FeeCalendarViewComponent,
        FeeTabsComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
