import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AssociationLayoutContainer } from './association-layout.container';

describe('AssociationLayoutContainer', () => {
  let component: AssociationLayoutContainer;
  let fixture: ComponentFixture<AssociationLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssociationLayoutContainer
      ],
      providers: [
        provideAnimationsAsync(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
