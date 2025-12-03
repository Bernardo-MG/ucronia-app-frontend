import { ContactName } from "@app/domain/contact/contact-name";

export class FeeCalendarSelection {
  number = -1;
  name = new ContactName();
  month = new Date();
  paid = false;
}