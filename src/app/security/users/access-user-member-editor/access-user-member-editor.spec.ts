import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserMemberEditor } from './access-user-member-editor';

describe('AccessUserMemberEditor', () => {
  let component: AccessUserMemberEditor;
  let fixture: ComponentFixture<AccessUserMemberEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserMemberEditor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserMemberEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
