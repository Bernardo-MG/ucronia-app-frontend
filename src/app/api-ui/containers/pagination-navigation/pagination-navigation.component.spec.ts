import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationNavigationTemplateComponent } from '@app/api-ui/components/pagination-navigation-template/pagination-navigation-template.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationNavigationComponent } from './pagination-navigation.component';

describe('PaginationNavigationTemplateComponent', () => {
  let component: PaginationNavigationComponent;
  let fixture: ComponentFixture<PaginationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        PaginationNavigationComponent,
        PaginationNavigationTemplateComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
