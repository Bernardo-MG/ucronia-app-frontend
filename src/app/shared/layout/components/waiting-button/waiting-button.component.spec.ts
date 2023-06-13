import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingButtonComponent } from './waiting-button.component';

describe('WaitingButtonComponent', () => {
  let component: WaitingButtonComponent;
  let fixture: ComponentFixture<WaitingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
