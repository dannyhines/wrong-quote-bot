require("dotenv").config();
import { randomStringFromFile, request } from "./helpers";
import { QuoteObj, TrumpQuote } from "./types";

export async function getRandomQuote() {
  let quote: string | boolean = false;
  try {
    const rand = Math.random();
    if (rand < 0.1) {
      quote = await getTrumpQuote();
    } else if (rand < 0.4) {
      quote = getLotrQuote();
    } else {
      quote = await getQuotableQuote();
    }
    return quote;
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
