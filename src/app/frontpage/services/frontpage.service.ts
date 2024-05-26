import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLoader } from '@app/shared/menu/utils/menu-loader';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PublicConfiguration } from '../models/public-configuration';
import { MENU_OPTIONS } from './menu-options';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private menus: Menu[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.menus = new MenuLoader().load(MENU_OPTIONS);
  }

  /**
   * Get the menus options.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    return this.menus;
  }

  public getCalendarCode(): Observable<string> {
    return this.getConfigClient()
      .read<SimpleResponse<PublicConfiguration>>()
      .pipe(map(r => r.content.calendarCode));
  }

  public getMapCode(): Observable<string> {
    return this.getConfigClient()
      .read<SimpleResponse<PublicConfiguration>>()
      .pipe(map(r => r.content.mapCode));
  }

  private getConfigClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/configuration/public');
  }

}
