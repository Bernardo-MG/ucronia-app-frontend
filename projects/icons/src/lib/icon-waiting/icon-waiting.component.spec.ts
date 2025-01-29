import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconWaitingComponent } from './icon-waiting.component';

describe('IconWaitingComponent', () => {
  let component: IconWaitingComponent;
  let fixture: ComponentFixture<IconWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconWaitingComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
