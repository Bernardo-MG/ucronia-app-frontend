import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookReturnFormComponent } from './book-return-form.component';

describe('BookReturnFormComponent', () => {
  let component: BookReturnFormComponent;
  let fixture: ComponentFixture<BookReturnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookReturnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
