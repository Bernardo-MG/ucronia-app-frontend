import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Image, ImageFolder } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {

  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);

  public getAll(page: number | undefined, sort: Sorting, size: number | undefined = undefined): Observable<Page<Image>> {
    return this.client.image.page(page, size, sort);
  }

  public getAllForSelection(): Observable<Image[]> {
    const sorting = new Sorting([new SortingProperty('name')]);
    return getAllPages((page, size) => this.getAll(page, sorting, size));
  }

  public getFolders(): Observable<ImageFolder[]> {
    return this.client.image.folders();
  }

  public getFolderImages(folderNumber: number, page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<Image>> {
    return this.client.image.folderPage(folderNumber, page, size, sort);
  }

  public getRootImages(page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<Image>> {
    return this.client.image.rootPage(page, size, sort);
  }

  public createFolder(name: string, parentNumber: number | null): Observable<ImageFolder> {
    return this.client.image.createFolder(name, parentNumber)
      .pipe(tap(() => this.notify('Creada', 'Carpeta creada')));
  }

  public updateFolder(folder: ImageFolder): Observable<ImageFolder> {
    return this.client.image.updateFolder(folder.number, folder.name, folder.parentNumber)
      .pipe(tap(() => this.notify('Actualizada', 'Carpeta actualizada')));
  }

  public deleteFolder(number: number): Observable<ImageFolder> {
    return this.client.image.deleteFolder(number)
      .pipe(tap(() => this.notify('Borrada', 'Carpeta borrada')));
  }

  public move(imageNumber: number, folderNumber: number | null): Observable<Image> {
    const request = folderNumber === null ? this.client.image.moveToRoot(imageNumber)
      : this.client.image.moveToFolder(imageNumber, folderNumber);
    return request.pipe(tap(() => this.notify('Movida', 'Imagen movida')));
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
    let response: Observable<Image>;

    if (file) {
      response = this.client.image.update(image.number, image.name, image.description, file);
    } else {
      response = this.client.image.patch(image.number, image.name, image.description);
    }
    response = response.pipe(tap(() => this.notify('Actualizada', 'Imagen actualizada')));

    return response;
  }

  public delete(number: number): Observable<Image> {
    return this.client.image.delete(number)
      .pipe(tap(() => this.notify('Borrada', 'Imagen borrada')));
  }

  private notify(summary: string, detail: string): void {
    this.messages.add({ severity: 'info', summary, detail, life: 3000 });
  }
}
