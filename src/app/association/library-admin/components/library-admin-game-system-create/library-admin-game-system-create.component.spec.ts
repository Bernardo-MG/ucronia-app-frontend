import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameSystemCreateComponent } from './library-admin-game-system-create.component';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

describe('LibraryAdminGameSystemCreateComponent', () => {
  let component: LibraryAdminGameSystemCreateComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminGameSystemCreateComponent
      ],
      providers: [
        GameSystemAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameSystemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
