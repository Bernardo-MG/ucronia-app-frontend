import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastBackwardIconComponent } from './icon-fast-backward.component';

describe('FastBackwardIconComponent', () => {
  let component: FastBackwardIconComponent;
  let fixture: ComponentFixture<FastBackwardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
