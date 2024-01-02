import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberEditionFormComponent } from './member-edit-form.component';

describe('MemberEditionFormComponent', () => {
  let component: MemberEditionFormComponent;
  let fixture: ComponentFixture<MemberEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule,
        IconsModule
      ],
      declarations: [
        MemberEditionFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
