import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInfoEditorComponent } from './people-info-editor.component';

describe('PeopleInfoEditorComponent', () => {
  let component: PeopleInfoEditorComponent;
  let fixture: ComponentFixture<PeopleInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleInfoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
