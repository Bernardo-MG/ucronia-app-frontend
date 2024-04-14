import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { NavbarComponent } from '../../header/navbar/navbar.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent {

  public title = '';

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();
  }

}
