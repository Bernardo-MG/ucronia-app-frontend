import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CueLoadingComponent } from './icon-waiting.component';

describe('CueLoadingComponent', () => {
  let component: CueLoadingComponent;
  let fixture: ComponentFixture<CueLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        CueLoadingComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CueLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
