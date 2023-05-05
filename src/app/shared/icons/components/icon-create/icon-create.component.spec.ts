import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconCreateComponent } from './icon-create.component';

describe('IconCreateComponent', () => {
  let component: IconCreateComponent;
  let fixture: ComponentFixture<IconCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconCreateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
