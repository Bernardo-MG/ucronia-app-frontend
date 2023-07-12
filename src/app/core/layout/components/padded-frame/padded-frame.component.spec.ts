import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaddedFrameComponent } from './padded-frame.component';

describe('PaddedFrameComponent', () => {
  let component: PaddedFrameComponent;
  let fixture: ComponentFixture<PaddedFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ 
        PaddedFrameComponent
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaddedFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
