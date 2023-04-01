import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonBackwardComponent } from './button-backward.component';

describe('ButtonBackwardComponent', () => {
  let component: ButtonBackwardComponent;
  let fixture: ComponentFixture<ButtonBackwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        ButtonBackwardComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonBackwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
