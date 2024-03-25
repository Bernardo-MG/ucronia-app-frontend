import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryGameSystemListComponent } from './library-game-system-list.component';
import { GameSystemService } from '../../services/game-system.service';

describe('LibraryGameSystemListComponent', () => {
  let component: LibraryGameSystemListComponent;
  let fixture: ComponentFixture<LibraryGameSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryGameSystemListComponent
      ],
      providers: [
        GameSystemService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryGameSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
