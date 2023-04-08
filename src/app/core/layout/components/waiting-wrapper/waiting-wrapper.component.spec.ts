import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingWrapperComponent } from './waiting-wrapper.component';

describe('WaitingWrapperComponent', () => {
  let component: WaitingWrapperComponent;
  let fixture: ComponentFixture<WaitingWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
