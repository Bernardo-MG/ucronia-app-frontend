import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserRolesEditorComponent } from './access-user-roles-editor.component';

describe('AccessUserRolesEditorComponent', () => {
  let component: AccessUserRolesEditorComponent;
  let fixture: ComponentFixture<AccessUserRolesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserRolesEditorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRolesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
