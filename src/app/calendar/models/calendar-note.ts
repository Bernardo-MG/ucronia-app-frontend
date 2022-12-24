export class CalendarNote {
  public year: number = 0;
  public month: number = 0;
  public day: number = 0;
  public description: string = "";

  constructor(year: number, month: number, day: number, description: string) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.description = description;
  }
}