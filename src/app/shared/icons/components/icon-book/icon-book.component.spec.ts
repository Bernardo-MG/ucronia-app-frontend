import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconBookComponent } from './icon-book.component';

describe('IconBookComponent', () => {
  let component: IconBookComponent;
  let fixture: ComponentFixture<IconBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
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
