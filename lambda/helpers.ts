import fetch, { RequestInit } from "node-fetch";
import * as fs from "fs";

export async function request<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
  const response = await fetch(url, config);
  return (await response.json()) as TResponse;
}

// Get a random name from the .txt file
export function getRandomName(): string {
  const names = fs.readFileSync("famousPeople.txt", "utf-8").split("\n");
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
