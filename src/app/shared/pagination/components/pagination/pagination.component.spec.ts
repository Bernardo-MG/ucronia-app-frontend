import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationTemplateComponent } from '../pagination-template/pagination-template.component';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        IconsModule
      ],
      declarations: [
        PaginationComponent,
        PaginationTemplateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
