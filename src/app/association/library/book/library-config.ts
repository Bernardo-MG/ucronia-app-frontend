import { Injectable } from '@angular/core';
import { Language } from '@app/domain/library/language';

@Injectable({
  providedIn: "root"
})
export class LibraryConfig {

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

}
