import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberCreateFormComponent } from './member-create-form.component';

describe('MemberCreateFormComponent', () => {
  let component: MemberCreateFormComponent;
  let fixture: ComponentFixture<MemberCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule
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
