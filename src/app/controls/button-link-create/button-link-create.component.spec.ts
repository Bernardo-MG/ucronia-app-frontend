import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLinkCreateComponent } from './button-link-create.component';

describe('ButtonLinkCreateComponent', () => {
  let component: ButtonLinkCreateComponent;
  let fixture: ComponentFixture<ButtonLinkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLinkCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
