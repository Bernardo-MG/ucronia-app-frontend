import { CalendarNote } from "./calendar-note";

export class CalendarDay {
  public number: (number | null) = 0;
  public notes: CalendarNote[] = [];

  constructor(number: number | null) {
    this.number = number;
  }
}