import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForwardIconComponent } from './icon-forward.component';

describe('ForwardIconComponent', () => {
  let component: ForwardIconComponent;
  let fixture: ComponentFixture<ForwardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForwardIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForwardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
