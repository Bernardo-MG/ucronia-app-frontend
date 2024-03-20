import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { Publisher } from '../../models/publisher';
import { PublisherService } from '../../services/publisher.service';
import { LibraryPublisherFormComponent } from '../library-publisher-form/library-publisher-form.component';

@Component({
  selector: 'assoc-library-publisher-create',
  standalone: true,
  imports: [ LayoutModule, LibraryPublisherFormComponent ],
  templateUrl: './library-publisher-create.component.html'
})
export class LibraryPublisherCreateComponent extends CreateComponent<Publisher> {

  constructor(
    private service: PublisherService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Publisher): Observable<Publisher> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Publisher): string {
    return `/library/gameSystem/${saved.name}`;
  }

}
