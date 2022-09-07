import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationActuatorNavigationComponent } from './pagination-actuator-navigation.component';

describe('PaginationActuatorNavigationComponent', () => {
  let component: PaginationActuatorNavigationComponent;
  let fixture: ComponentFixture<PaginationActuatorNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationActuatorNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationActuatorNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
