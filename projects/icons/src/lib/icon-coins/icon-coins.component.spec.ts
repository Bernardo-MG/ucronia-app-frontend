import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconCoinsComponent } from './icon-coins.component';

describe('IconCoinsComponent', () => {
  let component: IconCoinsComponent;
  let fixture: ComponentFixture<IconCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconCoinsComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
