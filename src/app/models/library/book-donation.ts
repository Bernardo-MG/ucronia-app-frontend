import { Person } from "../person/person";
import { Author } from "./author";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";
import { Publisher } from "./publisher";
import { Title } from "./title";

export class BookDonation {
  donationDate = '';
  donors: Person[] = [];
}
