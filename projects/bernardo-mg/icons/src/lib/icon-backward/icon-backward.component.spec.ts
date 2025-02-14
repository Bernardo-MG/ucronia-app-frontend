import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconBackwardComponent } from './icon-backward.component';

describe('IconBackwardComponent', () => {
  let component: IconBackwardComponent;
  let fixture: ComponentFixture<IconBackwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconBackwardComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconBackwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
