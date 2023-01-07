import { getQuote } from "./quote";
import { sendTweet } from "./twitter";
import { getRandomName } from "./helpers";

exports.handler = async function (event: any, _context: any) {
  try {
    const quote = await getQuote();
    const name = getRandomName();
    if (quote && name) {
      await sendTweet(`"${quote}"\n-${name}`);
    }
    return { message: quote };
  } catch (err) {
    console.log("Caught error: ", err);
    return { message: "Server Error" };
  }
};
