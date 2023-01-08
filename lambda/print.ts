import { randomStringFromFile } from "./helpers";
import { getRandomQuote } from "./quote";

(async () => {
  const quote = await getRandomQuote();
  const name = randomStringFromFile("famousPeople.txt");
  console.log(`"${quote}"\n-${name}`);
})();
