import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssociationLayout } from './association-layout';

describe('AssociationLayout', () => {
  let component: AssociationLayout;
  let fixture: ComponentFixture<AssociationLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssociationLayout
      ],
      providers: [
        MessageService,
        provideAnimationsAsync(),
        provideRouter([])
      ]
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
