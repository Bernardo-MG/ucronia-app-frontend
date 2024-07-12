import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconTakeInComponent } from './icon-take-in.component';

describe('IconTakeInComponent', () => {
  let component: IconTakeInComponent;
  let fixture: ComponentFixture<IconTakeInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconTakeInComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconTakeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
