import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForwardIconComponent } from './forward-icon.component';

describe('ForwardIconComponent', () => {
  let component: ForwardIconComponent;
  let fixture: ComponentFixture<ForwardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
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
