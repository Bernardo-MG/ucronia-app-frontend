import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLinkEditComponent } from './button-link-edit.component';

describe('ButtonLinkEditComponent', () => {
  let component: ButtonLinkEditComponent;
  let fixture: ComponentFixture<ButtonLinkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLinkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
