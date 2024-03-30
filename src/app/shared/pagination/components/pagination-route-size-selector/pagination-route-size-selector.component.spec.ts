import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationSizeSelectorComponent as PaginationRouteSizeSelectorComponent } from './pagination-route-size-selector.component';

describe('PaginationRouteSizeSelectorComponent', () => {
  let component: PaginationRouteSizeSelectorComponent;
  let fixture: ComponentFixture<PaginationRouteSizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        PaginationRouteSizeSelectorComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationRouteSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
