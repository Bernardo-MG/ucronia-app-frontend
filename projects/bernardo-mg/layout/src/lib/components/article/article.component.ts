import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Article component. Contains a heading and a body. Additionally it handles a waiting cue, to show it is loading the body content.
 */
@Component({
  selector: 'layout-article',
  imports: [CommonModule],
  templateUrl: './article.component.html'
})
export class ArticleComponent {

  /**
   * Article title, to be shown on the heading.
   */
  @Input() public title = '';

}
