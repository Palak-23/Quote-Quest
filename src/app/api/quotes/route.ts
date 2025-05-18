import { NextResponse } from "next/server";
import axios from "axios";
import { Quote } from "@/types/quote";

// Fallback quotes in case the API fails
const fallbackQuotes: Quote[] = [
  {
    q: "The best way to predict the future is to create it.",
    a: "Abraham Lincoln",
    c: "57",
    h: "The best way to predict the future is to create it.",
  },
  {
    q: "Stay hungry, stay foolish.",
    a: "Steve Jobs",
    c: "42",
    h: "Stay hungry, stay foolish.",
  },
  {
    q: "Code is like humor. When you have to explain it, it's bad.",
    a: "Cory House",
    c: "70",
    h: "Code is like humor. When you have to explain it, it's bad.",
  },
  {
    q: "Simplicity is the soul of efficiency.",
    a: "Austin Freeman",
    c: "65",
    h: "Simplicity is the soul of efficiency.",
  },
  {
    q: "Make it work, make it right, make it fast.",
    a: "Kent Beck",
    c: "82",
    h: "Make it work, make it right, make it fast.",
  },
];

export async function GET() {
  try {
    // Try to fetch from the external API first
    const response = await axios.get<Quote[]>(
      "https://zenquotes.io/api/quotes/random",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );

    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      return NextResponse.json(response.data[0]);
    }
  } catch (error) {
    console.error("Error fetching from external API:", error);
    // If external API fails, use fallback quotes
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return NextResponse.json(fallbackQuotes[randomIndex]);
  }

  // If we get here, use fallback quotes
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  return NextResponse.json(fallbackQuotes[randomIndex]);
}
