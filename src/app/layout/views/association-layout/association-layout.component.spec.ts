import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationLayoutComponent } from './association-layout.component';

describe('AssociationLayoutComponent', () => {
  let component: AssociationLayoutComponent;
  let fixture: ComponentFixture<AssociationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
