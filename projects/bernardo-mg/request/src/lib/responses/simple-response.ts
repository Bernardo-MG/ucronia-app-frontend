export class SimpleResponse<T> {

  constructor(cont: T) {
    this.content = cont;
  }

  content: T;
}