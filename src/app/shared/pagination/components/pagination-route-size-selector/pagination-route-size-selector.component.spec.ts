import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationSizeSelectorComponent as PaginationRouteSizeSelectorComponent } from './pagination-route-size-selector.component';

describe('PaginationRouteSizeSelectorComponent', () => {
  let component: PaginationRouteSizeSelectorComponent;
  let fixture: ComponentFixture<PaginationRouteSizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
