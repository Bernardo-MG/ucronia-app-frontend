import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonForwardComponent } from './button-forward.component';

describe('ButtonForwardComponent', () => {
  let component: ButtonForwardComponent;
  let fixture: ComponentFixture<ButtonForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        ButtonForwardComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
