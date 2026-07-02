import { Recurrence } from "@ucronia/domain";

export class ScheduledGameEdition {
  public number = 0;
  public title = "";
  public description = "";
  public location = "";
  public master = 0;
  public maxPlayers = 0;
  public image = "";
  public start = new Date();
  public recurrence = new Recurrence();
}
