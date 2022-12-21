import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTabsComponent } from './fee-tabs.component';

describe('FeeTabsComponent', () => {
  let component: FeeTabsComponent;
  let fixture: ComponentFixture<FeeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
