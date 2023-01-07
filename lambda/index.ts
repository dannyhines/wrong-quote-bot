import fetch, { RequestInit } from "node-fetch";

exports.handler = async function (event: any, _context: any) {
  console.log("in Lambda, EVENT:", event);
  try {
    const quote = await getQuote();
    return { message: quote };
  } catch (err) {
    console.log("Caught error: ", err);
    return { message: "Server Error" };
  }
};

// Get a random quote from the Quotable API
async function getQuote() {
  const response = await fetch("https://api.quotable.io/random?minLength=50&maxLength=240");
  try {
    const quoteObj = await request<QuoteObj>(
      "https://api.quotable.io/random?minLength=50&maxLength=240"
    );
    return quoteObj.content;
  } catch (error) {
    console.log("Oi, we got an error -", error);
    return "Error";
  }
}

interface QuoteObj {
  _id: string;
  content: string; // quote text
  author: string;
  authorSlug: string; // number of characters
  length: number;
  tags: string[];
}

async function request<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
  const response = await fetch(url, config);
  return (await response.json()) as TResponse;
}

// (async () => {
//   try {
//     const quote = await getQuote();
//     console.log("quote is", quote);
//   } catch (error) {
//     // Handle any error happened.
//     console.log("didn't work");
//   }
// })();
