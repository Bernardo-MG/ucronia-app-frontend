export class Sort<T> {

  constructor(prop: keyof T) {
    this.property = prop;
  }

  property: keyof T;
  order: 'asc' | 'desc' = 'asc';
}