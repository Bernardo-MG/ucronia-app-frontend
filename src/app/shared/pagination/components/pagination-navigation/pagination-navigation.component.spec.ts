import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationNavigationTemplateComponent } from '../pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from './pagination-navigation.component';

describe('PaginationNavigationComponent', () => {
  let component: PaginationNavigationComponent;
  let fixture: ComponentFixture<PaginationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        IconsModule
      ],
      declarations: [
        PaginationNavigationComponent,
        PaginationNavigationTemplateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
