import fetch, { RequestInfo, RequestInit } from "node-fetch";
import * as fs from "fs";

export async function request<TResponse>(
  url: RequestInfo,
  init?: RequestInit | undefined
): Promise<TResponse> {
  const response = await fetch(url, init);
  return (await response.json()) as TResponse;
}

// Get a random string from a .txt file
export function randomStringFromFile(filename: string): string {
  const items = fs.readFileSync(filename, "utf-8").split("\n");
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
