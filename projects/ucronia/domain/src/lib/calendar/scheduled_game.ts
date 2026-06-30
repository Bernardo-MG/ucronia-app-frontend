
export class ScheduledGame {
  public number = 0;
  public title = "";
  public description = "";
  public location = "";
  public master = new ScheduledGameMember();
  public maxPlayers = 0;
  public image = "";
  public start = new Date();
  public recurrence = new Recurrence();
  public published = false;
}

export class ScheduledGameMember {
  public number = 0;
  public firstName = "";
  public lastName = "";
}

export class Recurrence {
  public interval = 0;
  public unit = "";
}

export enum RecurrenceUnit {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}