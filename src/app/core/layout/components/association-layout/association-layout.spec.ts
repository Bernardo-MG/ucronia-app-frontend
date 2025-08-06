import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationLayout } from './association-layout';

describe('AssociationLayout', () => {
  let component: AssociationLayout;
  let fixture: ComponentFixture<AssociationLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
