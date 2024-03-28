import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeMemberSelectionComponent } from './fee-member-selection.component';

describe('FeeMemberSelectionComponent', () => {
  let component: FeeMemberSelectionComponent;
  let fixture: ComponentFixture<FeeMemberSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeMemberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
