import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSearchSecondaryComponent } from './button-search-secondary.component';

describe('ButtonSearchComponent', () => {
  let component: ButtonSearchSecondaryComponent;
  let fixture: ComponentFixture<ButtonSearchSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSearchSecondaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSearchSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
