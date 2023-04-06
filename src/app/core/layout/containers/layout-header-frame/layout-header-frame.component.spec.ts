import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHeaderFrameComponent } from './layout-header-frame.component';

describe('LayoutHeaderFrameComponent', () => {
  let component: LayoutHeaderFrameComponent;
  let fixture: ComponentFixture<LayoutHeaderFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutHeaderFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutHeaderFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
