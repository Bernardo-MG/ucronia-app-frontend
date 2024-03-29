import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackwardIconComponent } from './icon-backward.component';

describe('BackwardIconComponent', () => {
  let component: BackwardIconComponent;
  let fixture: ComponentFixture<BackwardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        BackwardIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackwardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
