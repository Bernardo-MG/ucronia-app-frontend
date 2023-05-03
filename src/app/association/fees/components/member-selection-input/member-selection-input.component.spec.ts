import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { MemberSelectionInputComponent } from './member-selection-input.component';

describe('MemberSelectionInputComponent', () => {
  let component: MemberSelectionInputComponent;
  let fixture: ComponentFixture<MemberSelectionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule
      ],
      declarations: [
        MemberSelectionInputComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberSelectionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
