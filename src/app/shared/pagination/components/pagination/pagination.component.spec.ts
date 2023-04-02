import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationTemplateComponent } from '../pagination-template/pagination-template.component';
import { PaginationComponent } from './pagination.component';
import { BackwardIconComponent } from '@app/shared/icons/backward-icon/backward-icon.component';
import { ForwardIconComponent } from '@app/shared/icons/forward-icon/forward-icon.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ButtonComponent } from '@app/shared/components/button/button.component';

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
        PaginationTemplateComponent,
        ButtonComponent,
        BackwardIconComponent,
        ForwardIconComponent
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
