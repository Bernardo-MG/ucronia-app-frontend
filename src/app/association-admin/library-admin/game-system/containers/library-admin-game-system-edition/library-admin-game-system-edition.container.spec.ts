import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { LibraryAdminGameSystemInfoEditorContainer } from './library-admin-game-system-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminGameSystemInfoEditorContainer', () => {
  let component: LibraryAdminGameSystemInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminGameSystemInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminGameSystemInfoEditorContainer],
    providers: [
        GameSystemAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameSystemInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
