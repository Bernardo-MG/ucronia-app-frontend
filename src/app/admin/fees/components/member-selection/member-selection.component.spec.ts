import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';

import { MemberSelectionComponent } from './member-selection.component';

describe('MemberSelectionComponent', () => {
  let component: MemberSelectionComponent;
  let fixture: ComponentFixture<MemberSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiUiModule
      ],
      declarations: [
        MemberSelectionComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
