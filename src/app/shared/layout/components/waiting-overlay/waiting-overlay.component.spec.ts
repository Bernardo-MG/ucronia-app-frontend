import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitingOverlayComponent } from './waiting-overlay.component';

describe('WaitingOverlayComponent', () => {
  let component: WaitingOverlayComponent;
  let fixture: ComponentFixture<WaitingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WaitingOverlayComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WaitingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
