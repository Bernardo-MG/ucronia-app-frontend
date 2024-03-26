import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDropdownComponent } from './config-dropdown.component';

describe('ConfigDropdownComponent', () => {
  let component: ConfigDropdownComponent;
  let fixture: ComponentFixture<ConfigDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigDropdownComponent]
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
