import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationNavigationTemplateComponent } from '../../components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from '../../components/pagination-navigation/pagination-navigation.component';
import { PaginationRouteNavigationComponent } from './pagination-route-navigation.component';

describe('PaginationNavigationComponent', () => {
  let component: PaginationNavigationComponent;
  let fixture: ComponentFixture<PaginationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        IconsModule
      ],
      declarations: [
        PaginationRouteNavigationComponent,
        PaginationNavigationTemplateComponent,
        PaginationNavigationComponent
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
