import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryGameSystemCreateComponent } from './library-game-system-create.component';
import { GameSystemService } from '../../services/game-system.service';

describe('LibraryGameSystemCreateComponent', () => {
  let component: LibraryGameSystemCreateComponent;
  let fixture: ComponentFixture<LibraryGameSystemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryGameSystemCreateComponent
      ],
      providers: [
        GameSystemService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
