import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDropdownComponent } from './config-dropdown.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfigDropdownComponent', () => {
  let component: ConfigDropdownComponent;
  let fixture: ComponentFixture<ConfigDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ConfigDropdownComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfigDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
