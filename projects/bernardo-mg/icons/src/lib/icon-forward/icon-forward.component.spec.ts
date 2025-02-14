import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconForwardComponent } from './icon-forward.component';

describe('IconForwardComponent', () => {
  let component: IconForwardComponent;
  let fixture: ComponentFixture<IconForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconForwardComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
