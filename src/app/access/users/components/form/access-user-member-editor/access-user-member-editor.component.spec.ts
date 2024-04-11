import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserMemberEditorComponent } from './access-user-member-editor.component';

describe('AccessUserMemberEditorComponent', () => {
  let component: AccessUserMemberEditorComponent;
  let fixture: ComponentFixture<AccessUserMemberEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserMemberEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessUserMemberEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
