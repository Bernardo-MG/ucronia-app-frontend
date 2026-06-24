
export class Activity {
  public number = 0;
  public title = "";
  public description = "";
  public location = "";
  public image = "";
  public dates: ActivityDate[] = [];
}

export class ActivityDate {
  public start = new Date();
  public end = new Date();
}