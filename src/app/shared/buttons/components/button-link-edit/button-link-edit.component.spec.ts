import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonLinkEditComponent } from './button-link-edit.component';

describe('ButtonLinkEditComponent', () => {
  let component: ButtonLinkEditComponent;
  let fixture: ComponentFixture<ButtonLinkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        IconsModule
      ],
      declarations: [
        ButtonLinkEditComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
