import { inject, Injectable } from '@angular/core';
import { Page, Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Image } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {

  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);

  public getAll(page: number | undefined, sort: Sorting): Observable<Page<Image>> {
    return this.client.image.page(page, undefined, sort);
  }

  public get(number: number): Observable<Image> {
    return this.client.image.get(number);
  }

  public contentUrl(number: number): string {
    return this.client.image.contentUrl(number);
  }

  public create(image: Image, file: File): Observable<Image> {
    return this.client.image.create(image.name, image.description, file)
      .pipe(tap(() => this.notify('Creada', 'Imagen creada')));
  }

  public update(image: Image, file?: File): Observable<Image> {
    if (file) {
      return this.updateWithFile(image, file);
    }
    return this.client.image.content(image.number)
      .pipe(
        switchMap(content => this.updateWithFile(image,
          new File([content], image.name, { type: image.mediaType })))
      );
  }

  public delete(number: number): Observable<Image> {
    return this.client.image.delete(number)
      .pipe(tap(() => this.notify('Borrada', 'Imagen borrada')));
  }

  private updateWithFile(image: Image, file: File): Observable<Image> {
    return this.client.image.update(image.number, image.name, image.description, file)
      .pipe(tap(() => this.notify('Actualizada', 'Imagen actualizada')));
  }

  private notify(summary: string, detail: string): void {
    this.messages.add({ severity: 'info', summary, detail, life: 3000 });
  }
}
