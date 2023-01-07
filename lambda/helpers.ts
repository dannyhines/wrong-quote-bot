import fetch, { RequestInit } from "node-fetch";

export interface QuoteObj {
  _id: string;
  content: string; // quote text
  author: string;
  authorSlug: string; // number of characters
  length: number;
  tags: string[];
}

export async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);
  return (await response.json()) as TResponse;
}
