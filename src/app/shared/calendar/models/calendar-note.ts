export class CalendarNote {
  public year = 0;
  public month = 0;
  public day = 0;
  public date = new Date();
  public description = '';

  constructor(year: number, month: number, day: number, description: string) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.date = new Date(year, month - 1, day);
    this.description = description;
  }
}