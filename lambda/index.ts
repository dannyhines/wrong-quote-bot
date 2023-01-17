import { getRandomQuote } from "./src/quote";
import { sendTweet } from "./src/twitter";
import { randomStringFromFile } from "./src/helpers";

exports.handler = async function (event: any, _context: any) {
  try {
    const quote = await getRandomQuote();
    const name = randomStringFromFile("famousPeople.txt");
    if (quote && name) {
      await sendTweet(`"${quote}"\n-${name}`);
    }
    return { message: quote };
  } catch (err) {
    console.log("Caught error: ", err);
    return { message: "Server Error" };
  }
};
