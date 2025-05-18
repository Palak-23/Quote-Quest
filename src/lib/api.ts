"use client";

import { Quote } from "@/types/quote";

export async function fetchRandomQuote(): Promise<Quote> {
  try {
    const response = await fetch("/api/quotes", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate the response data
    if (!data || typeof data !== "object" || !data.q || !data.a) {
      throw new Error("Invalid quote data received");
    }

    return data as Quote;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw new Error("Failed to fetch quote");
  }
}
