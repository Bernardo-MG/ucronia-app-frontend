import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconBookComponent } from './icon-book.component';

describe('IconBookComponent', () => {
  let component: IconBookComponent;
  let fixture: ComponentFixture<IconBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconBookComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
