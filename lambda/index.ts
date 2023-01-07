import { getRandomQuote } from "./quote";
import { sendTweet } from "./twitter";
import { randomStringFromFile } from "./helpers";

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
