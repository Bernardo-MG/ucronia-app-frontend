import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationInfoComponent } from './pagination-info.component';

describe('PaginationInfoWrapperComponent', () => {
  let component: PaginationInfoComponent;
  let fixture: ComponentFixture<PaginationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
