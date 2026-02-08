import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMemberEditor } from './user-member-editor';

describe('UserMemberEditor', () => {
  let component: UserMemberEditor;
  let fixture: ComponentFixture<UserMemberEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMemberEditor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserMemberEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
