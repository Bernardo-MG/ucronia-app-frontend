import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserRolesEditor } from './access-user-roles-editor';

describe('AccessUserRolesEditor', () => {
  let component: AccessUserRolesEditor;
  let fixture: ComponentFixture<AccessUserRolesEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserRolesEditor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRolesEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
