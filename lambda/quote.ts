require("dotenv").config();
import { randomStringFromFile, request } from "./helpers";
import { QuoteObj, TrumpQuote } from "./types";

const sources: { [source: string]: number } = {
  lotr: 0.2,
  sports: 0.2,
  trump: 0.1,
  theoffice: 0.1,
  quotable: 0.3,
};

type Source = keyof typeof sources;

function getRandomSource(): Source {
  const totalWeight = Object.values(sources).reduce((sum, weight) => sum + weight, 0);
  const randomWeight = Math.random() * totalWeight;
  let cur = 0.0;
  for (const source in sources) {
    cur += sources[source];
    if (randomWeight < cur) {
      return source;
    }
  }
  return "quotable";
}

export async function getRandomQuote(): Promise<string | false> {
  try {
    const source = getRandomSource();
    switch (source) {
      case "lotr":
        return getLotrQuote();
      case "sports":
        return getSportsQuote();
      case "trump":
        return await getTrumpQuote();
      case "theoffice":
        return getTheOfficeQuote();
      case "quotable":
        return await getQuotableQuote();
      default:
        return false;
    }
  } catch (error) {
    console.log("Quotable API error -", error);
    return false;
  }
}

// ========= Quotable API =========

export async function getQuotableQuote() {
  try {
    const quoteObj = await request<QuoteObj>("https://api.quotable.io/random?minLength=50&maxLength=240");
    return quoteObj.content;
  } catch (error) {
    console.log("Quotable API error -", error);
    return false;
  }
}

// ========= Lord of the Rings =========

function getLotrQuote() {
  return randomStringFromFile("lotrQuotes.txt");
}

// ========= Trump =========

async function getTrumpQuote() {
  try {
    const quoteObj = await request<TrumpQuote>("https://api.tronalddump.io/random/quote");
    return quoteObj.value;
  } catch (error) {
    console.log("Trump quote error");
    return false;
  }
}

// ========= Sports =========

function getSportsQuote() {
  return randomStringFromFile("footballQuotes.txt");
}

// ========= The Office =========

function getTheOfficeQuote() {
  return randomStringFromFile("theOfficeQuotes.txt");
}

// (async () => {
//   try {
//     // console.log(await getLotrQuote());
//     const config = { headers: { Authorization: `Bearer ${process.env.LOTR_BEARER_TOKEN}` } };
//     const quoteRes = await request<LotrQuoteResponse>("https://the-one-api.dev/v2/quote?page=3", config);
//     console.log(quoteRes);
//     writeDialogsToFile("lotrQuotes3.txt", quoteRes.docs);
//   } catch (error) {
//     // Handle any error happened.
//     console.log("didn't work -", error);
//   }
// })();

// const text = fs.readFileSync("emmitSmith.txt", "utf-8").split("\n");
// const inRange = text.filter((q) => q.length > 50);
// const onlyQuotes = inRange.map((line) => line.split(`"`)[1]);
// const dialogLines = onlyQuotes.map((dialog) => dialog).join("\n");
// fs.writeFileSync("footballQuotes.txt", dialogLines);
