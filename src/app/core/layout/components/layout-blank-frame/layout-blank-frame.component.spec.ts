import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BlankFrameLayoutComponent } from './layout-blank-frame.component';

describe('BlankFrameLayoutComponent', () => {
  let component: BlankFrameLayoutComponent;
  let fixture: ComponentFixture<BlankFrameLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BlankFrameLayoutComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlankFrameLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
