import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { Key } from '@ucronia/domain';
import { KeyList } from './key-list';

describe('KeyList', () => {
  let component: KeyList;
  let fixture: ComponentFixture<KeyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyList],
      providers: [ConfirmationService]
    }).compileComponents();

    fixture = TestBed.createComponent(KeyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render key information and mark missing keys', () => {
    fixture.componentRef.setInput('data', [
      { number: 4, available: false, description: 'Puerta lateral' } as Key,
      { number: 8, available: true, description: 'Garaje' } as Key
    ]);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('4');
    expect(text).toContain('Puerta lateral');
    expect(text).toContain('Perdida');
    expect(text).toContain('8');
    expect(text).toContain('Garaje');
  });
});
