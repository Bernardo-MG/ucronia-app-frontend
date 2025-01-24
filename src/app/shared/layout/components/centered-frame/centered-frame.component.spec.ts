import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CenteredFrameComponent } from './centered-frame.component';

describe('CenteredFrameComponent', () => {
  let component: CenteredFrameComponent;
  let fixture: ComponentFixture<CenteredFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CenteredFrameComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CenteredFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
