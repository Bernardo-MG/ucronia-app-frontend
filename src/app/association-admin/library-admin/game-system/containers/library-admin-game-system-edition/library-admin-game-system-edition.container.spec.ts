import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { LibraryAdminGameSystemInfoEditorComponent } from './library-admin-game-system-edition.container';

describe('LibraryAdminGameSystemInfoEditorComponent', () => {
  let component: LibraryAdminGameSystemInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminGameSystemInfoEditorComponent
      ],
      providers: [
        GameSystemAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameSystemInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
