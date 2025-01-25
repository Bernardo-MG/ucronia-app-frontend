import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PaginationSizeSelectorComponent as PaginationRouteSizeSelectorComponent } from './pagination-route-size-selector.component';

describe('PaginationRouteSizeSelectorComponent', () => {
  let component: PaginationRouteSizeSelectorComponent;
  let fixture: ComponentFixture<PaginationRouteSizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginationRouteSizeSelectorComponent
      ],
      providers: [
        provideRouter([])
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
