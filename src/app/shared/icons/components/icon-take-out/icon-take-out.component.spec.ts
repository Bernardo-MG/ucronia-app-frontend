import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconTakeOutComponent } from './icon-take-out.component';

describe('IconTakeOutComponent', () => {
  let component: IconTakeOutComponent;
  let fixture: ComponentFixture<IconTakeOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconTakeOutComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconTakeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
