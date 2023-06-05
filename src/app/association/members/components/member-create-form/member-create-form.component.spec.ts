import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditionModule } from '@app/shared/edition/edition.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberCreateFormComponent } from './member-create-form.component';

describe('MemberCreateFormComponent', () => {
  let component: MemberCreateFormComponent;
  let fixture: ComponentFixture<MemberCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        IconsModule,
        LayoutModule,
        EditionModule
      ],
      declarations: [
        MemberCreateFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
