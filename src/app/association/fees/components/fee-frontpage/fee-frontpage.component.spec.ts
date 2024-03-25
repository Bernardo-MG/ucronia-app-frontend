import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeFrontpageComponent } from './fee-frontpage.component';

describe('FeeFrontpageComponent', () => {
  let component: FeeFrontpageComponent;
  let fixture: ComponentFixture<FeeFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeFrontpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
