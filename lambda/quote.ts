import { request } from "./helpers";
import { QuoteObj } from "./types";

// Get a random quote from the Quotable API
export async function getQuote() {
  try {
    const quoteObj = await request<QuoteObj>("https://api.quotable.io/random?minLength=50&maxLength=240");
    return quoteObj.content;
  } catch (error) {
    console.log("Oi, we got an error -", error);
    return false;
  }
}
