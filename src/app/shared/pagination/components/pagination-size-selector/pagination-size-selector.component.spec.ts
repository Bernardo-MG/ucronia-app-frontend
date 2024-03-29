import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationSizeSelectorTemplateComponent } from '@app/shared/pagination/components/pagination-size-selector-template/pagination-size-selector-template.component';
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
