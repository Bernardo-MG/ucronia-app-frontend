import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FastForwardIconComponent } from './icon-fast-forward.component';

describe('FastForwardIconComponent', () => {
  let component: FastForwardIconComponent;
  let fixture: ComponentFixture<FastForwardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        FastForwardIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FastForwardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
