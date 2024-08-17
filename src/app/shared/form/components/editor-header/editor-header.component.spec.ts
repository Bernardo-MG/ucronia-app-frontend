import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { EditorHeaderComponent } from './editor-header.component';

describe('EditorHeaderComponent', () => {
  let component: EditorHeaderComponent;
  let fixture: ComponentFixture<EditorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule,
        ModalComponent
      ],
      declarations: [
        EditorHeaderComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
