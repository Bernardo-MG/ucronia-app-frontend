export class CalendarNote {
  public year = 0;
  public month = 0;
  public day = 0;
  public description = "";

  constructor(year: number, month: number, day: number, description: string) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.description = description;
  }
}