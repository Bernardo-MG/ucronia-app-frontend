import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryGameSystemInfoEditorComponent } from './library-game-system-info-editor.component';
import { GameSystemService } from '../../services/game-system.service';

describe('LibraryGameSystemInfoEditorComponent', () => {
  let component: LibraryGameSystemInfoEditorComponent;
  let fixture: ComponentFixture<LibraryGameSystemInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryGameSystemInfoEditorComponent
      ],
      providers: [
        GameSystemService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
