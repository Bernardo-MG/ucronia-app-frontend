import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconSettingsComponent } from './icon-settings.component';

describe('IconSettingsComponent', () => {
  let component: IconSettingsComponent;
  let fixture: ComponentFixture<IconSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconSettingsComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
