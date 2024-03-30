import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameSystemListComponent } from './library-admin-game-system-list.component';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

describe('LibraryAdminGameSystemListComponent', () => {
  let component: LibraryAdminGameSystemListComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminGameSystemListComponent
      ],
      providers: [
        GameSystemAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
