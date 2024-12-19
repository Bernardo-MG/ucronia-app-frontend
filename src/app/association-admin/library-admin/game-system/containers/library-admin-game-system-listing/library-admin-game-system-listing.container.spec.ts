import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { LibraryAdminGameSystemListingComponent } from './library-admin-game-system-listing.container';

describe('LibraryAdminGameSystemListingComponent', () => {
  let component: LibraryAdminGameSystemListingComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminGameSystemListingComponent
      ],
      providers: [
        GameSystemAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameSystemListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
