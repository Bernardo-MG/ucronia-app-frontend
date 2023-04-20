import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconAccountComponent } from './icon-account.component';

describe('IconAccountComponent', () => {
  let component: IconAccountComponent;
  let fixture: ComponentFixture<IconAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconAccountComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
