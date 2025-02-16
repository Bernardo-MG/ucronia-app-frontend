import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterBreadcrumbComponent } from './router-breadcrumb.component';

describe('RouterBreadcrumbComponent', () => {
  let component: RouterBreadcrumbComponent;
  let fixture: ComponentFixture<RouterBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterBreadcrumbComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RouterBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
