import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconCoinsComponent } from './icon-coins.component';

describe('IconCoinsComponent', () => {
  let component: IconCoinsComponent;
  let fixture: ComponentFixture<IconCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
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
