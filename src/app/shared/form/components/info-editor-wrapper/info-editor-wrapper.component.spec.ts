import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoEditorWrapperComponent } from './info-editor-wrapper.component';

describe('InfoEditorWrapperComponent', () => {
  let component: InfoEditorWrapperComponent;
  let fixture: ComponentFixture<InfoEditorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InfoEditorWrapperComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InfoEditorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
