import { Membership } from "./membership";
import { PersonName } from "./person-name";

export class Person {
  number = -1;
  identifier = '';
  phone = '';
  name = new PersonName();
  membership: Membership | undefined = undefined;
}
