import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMemberEditorForm } from './user-member-editor-form';

describe('UserMemberEditorForm', () => {
  let component: UserMemberEditorForm;
  let fixture: ComponentFixture<UserMemberEditorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMemberEditorForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserMemberEditorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
