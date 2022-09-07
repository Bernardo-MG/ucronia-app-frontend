import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationPaginatorNavigationComponent } from './pagination-controller-navigation.component';

describe('PaginationPaginatorNavigationComponent', () => {
  let component: PaginationPaginatorNavigationComponent;
  let fixture: ComponentFixture<PaginationPaginatorNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationPaginatorNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationPaginatorNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
