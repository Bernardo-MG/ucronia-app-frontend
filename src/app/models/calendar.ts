export class Calendar {
  public year: number = 0;
  public month: string = "";
  public weeks: CalendarWeek[] = [];
}

export class CalendarWeek {
  public days: (number | null)[] = [];

  constructor(days: (number | null)[]) {
    this.days = days;
  }
}