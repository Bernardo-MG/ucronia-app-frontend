import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonSearchSecondaryComponent } from './button-search-secondary.component';

describe('ButtonSearchSecondaryComponent', () => {
  let component: ButtonSearchSecondaryComponent;
  let fixture: ComponentFixture<ButtonSearchSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        IconsModule
      ],
      declarations: [
        ButtonSearchSecondaryComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonSearchSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
