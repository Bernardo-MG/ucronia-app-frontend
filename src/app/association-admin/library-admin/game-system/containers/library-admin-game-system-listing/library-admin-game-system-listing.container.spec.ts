import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { LibraryAdminGameSystemListingContainer } from './library-admin-game-system-listing.container';

describe('LibraryAdminGameSystemListingContainer', () => {
  let component: LibraryAdminGameSystemListingContainer;
  let fixture: ComponentFixture<LibraryAdminGameSystemListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminGameSystemListingContainer
      ],
      providers: [
        GameSystemAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameSystemListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
