import { randomStringFromFile } from "./helpers";
import {
  getLotrQuote,
  getMovieQuote,
  getQuotableQuote,
  getRandomQuote,
  getRapQuote,
  getSportsQuote,
  getTheOfficeQuote,
  getTrumpQuote,
} from "./quote";

// Called for testing purposes
(async () => {
  const quote = await getRandomQuote();
  const name = randomStringFromFile("famousPeople.txt");
  console.log("--------------------------------------");
  console.log(`"${quote}"\n-${name}`);
  console.log("--------------------------------------");
  console.log(`LOTR:\t"${getLotrQuote()}"`);
  console.log(`SPORTS:\t"${getSportsQuote()}"`);
  console.log(`TRUMP:\t"${await getTrumpQuote()}"`);
  console.log(`OFFICE:\t"${getTheOfficeQuote()}"`);
  console.log(`QUOTE:\t"${await getQuotableQuote()}"`);
  console.log(`MOVIE:\t"${getMovieQuote()}"`);
  console.log(`RAP:\t"${getRapQuote()}"`);
})();
