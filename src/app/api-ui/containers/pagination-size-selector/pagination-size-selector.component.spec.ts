import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationNavigationTemplateComponent } from '@app/api-ui/components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationSizeSelectorTemplateComponent } from '@app/api-ui/components/pagination-size-selector-template/pagination-size-selector-template.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginationSizeSelectorComponent } from './pagination-size-selector.component';

describe('PaginationSizeSelectorComponent', () => {
  let component: PaginationSizeSelectorComponent;
  let fixture: ComponentFixture<PaginationSizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        PaginationSizeSelectorComponent,
        PaginationNavigationTemplateComponent,
        PaginationSizeSelectorTemplateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
