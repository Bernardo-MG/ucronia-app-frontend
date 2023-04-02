import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FastBackwardIconComponent } from './fast-backward-icon.component';

describe('FastBackwardIconComponent', () => {
  let component: FastBackwardIconComponent;
  let fixture: ComponentFixture<FastBackwardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        FastBackwardIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FastBackwardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
