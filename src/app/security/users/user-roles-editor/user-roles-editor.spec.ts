import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRolesEditor } from './user-roles-editor';

describe('UserRolesEditor', () => {
  let component: UserRolesEditor;
  let fixture: ComponentFixture<UserRolesEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesEditor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRolesEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
