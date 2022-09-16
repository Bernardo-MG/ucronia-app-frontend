import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutePaginationNavigationComponent } from './route-pagination-navigation.component';

describe('RoutePaginationNavigationComponent', () => {
  let component: RoutePaginationNavigationComponent;
  let fixture: ComponentFixture<RoutePaginationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RoutePaginationNavigationComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePaginationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
