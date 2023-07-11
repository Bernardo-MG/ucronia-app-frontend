import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeCalendarInfoComponent } from './fee-calendar-info.component';

describe('FeeCalendarInfoComponent', () => {
  let component: FeeCalendarInfoComponent;
  let fixture: ComponentFixture<FeeCalendarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        FeeCalendarInfoComponent
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
