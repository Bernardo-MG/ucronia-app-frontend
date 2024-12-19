import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleInfoEditorContainer } from './people-info-editor.container';

describe('PeopleInfoEditorContainer', () => {
  let component: PeopleInfoEditorContainer;
  let fixture: ComponentFixture<PeopleInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PeopleInfoEditorContainer
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
