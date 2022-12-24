export class CalendarWeek {
  public days: (number | null)[] = [];

  constructor(days: (number | null)[]) {
    this.days = days;
  }
}