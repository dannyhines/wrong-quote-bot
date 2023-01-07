import { sendTweet } from "./twitter";
import * as fs from "fs";
import { QuoteObj, request } from "./helpers";

exports.handler = async function (event: any, _context: any) {
  // console.log("in Lambda, EVENT:", event);
  try {
    const quote = await getQuote();
    const name = getRandomName();
    await sendTweet(`"${quote}"\n-${name}`);
    return { message: quote };
  } catch (err) {
    console.log("Caught error: ", err);
    return { message: "Server Error" };
  }
};

// Get a random quote from the Quotable API
async function getQuote() {
  try {
    const quoteObj = await request<QuoteObj>("https://api.quotable.io/random?minLength=50&maxLength=240");
    return quoteObj.content;
  } catch (error) {
    console.log("Oi, we got an error -", error);
    return "Error";
  }
}

// Get a random name from the .txt file
function getRandomName(): string {
  const names = fs.readFileSync("famousPeople.txt", "utf-8").split("\n");
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

// (async () => {
//   try {
//     // const quote = await getQuote();
//     // console.log("quote is", quote);
//     await handler({}, {});
//   } catch (error) {
//     // Handle any error happened.
//     console.log("didn't work");
//   }
// })();
