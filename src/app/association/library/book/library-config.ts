import { Injectable } from '@angular/core';
import { Language } from "@ucronia/domain";

@Injectable({
  providedIn: "root"
})
export class LibraryConfig {

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

}
