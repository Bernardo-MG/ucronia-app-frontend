/**
 * Simple response. Just the content.
 */
export class SimpleResponse<T> {

  constructor(cont: T) {
    this.content = cont;
  }

  content: T;
}