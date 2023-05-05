import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutIconComponent } from './icon-logout.component';

describe('LogoutIconComponent', () => {
  let component: LogoutIconComponent;
  let fixture: ComponentFixture<LogoutIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        LogoutIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogoutIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
