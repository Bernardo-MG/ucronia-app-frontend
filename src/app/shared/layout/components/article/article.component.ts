import { Component, Input } from '@angular/core';

/**
 * Article component. Contains a heading and a body. Additionally it handles a waiting cue, to show it is loading the body content.
 */
@Component({
  selector: 'layout-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent {

  /**
   * Article title, to be shown on the heading.
   */
  @Input() public title = '';

  /**
   * Waiting flag. When active the body is replaced by a waiting cue.
   */
  @Input() public waiting = false;

}
