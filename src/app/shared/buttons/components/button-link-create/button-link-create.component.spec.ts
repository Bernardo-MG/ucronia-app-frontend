import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonLinkCreateComponent } from './button-link-create.component';

describe('ButtonLinkCreateComponent', () => {
  let component: ButtonLinkCreateComponent;
  let fixture: ComponentFixture<ButtonLinkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        IconsModule
      ],
      declarations: [
        ButtonLinkCreateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
