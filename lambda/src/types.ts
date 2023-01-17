export interface QuoteObj {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export interface TrumpQuote {
  value: string;
}
