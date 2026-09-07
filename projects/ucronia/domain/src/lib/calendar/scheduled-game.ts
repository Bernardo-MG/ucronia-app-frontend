import { CalendarStatus } from "./calendar-status";
import { Recurrence } from "./recurrence";

export class ScheduledGame {
  public number = 0;
  public title = "";
  public gameType = ScheduledGameType.ONESHOT;
  public description = "";
  public location = "";
  public table: number | undefined = 0;
  public master = 0;
  public maxPlayers = 0;
  public image = "";
  public start = new Date();
  public recurrence: Recurrence | undefined = new Recurrence();
  public status = CalendarStatus.DRAFT;
}

export enum ScheduledGameType {
  CAMPAIGN = 'campaign',
  ONESHOT = 'oneshot'
}