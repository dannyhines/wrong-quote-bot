export interface QuoteObj {
  _id: string;
  content: string; // quote text
  author: string;
  authorSlug: string; // number of characters
  length: number;
  tags: string[];
}

export interface TrumpQuote {
  value: string;
}
