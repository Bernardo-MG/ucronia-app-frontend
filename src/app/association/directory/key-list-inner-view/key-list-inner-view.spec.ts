import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { Key } from '@ucronia/domain';
import { KeyService } from '../key-service';
import { KeyListInnerView } from './key-list-inner-view';

describe('KeyListInnerView', () => {
  let component: KeyListInnerView;
  let fixture: ComponentFixture<KeyListInnerView>;
  let keyService: jasmine.SpyObj<KeyService>;

  beforeEach(async () => {
    keyService = jasmine.createSpyObj<KeyService>('KeyService', ['getAll', 'create', 'update', 'delete']);
    keyService.getAll.and.returnValue(of([
      { number: 22, available: true, description: 'Entrada principal' } as Key
    ]));

    await TestBed.configureTestingModule({
      imports: [KeyListInnerView],
      providers: [
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: KeyService, useValue: keyService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KeyListInnerView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the key list on init', () => {
    expect(keyService.getAll).toHaveBeenCalled();
    expect(component.keys.length).toBe(1);
    expect(component.keys[0].number).toBe(22);
  });
});
