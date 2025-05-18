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
  {
    q: "The only way to do great work is to love what you do.",
    a: "Steve Jobs",
    c: "75",
    h: "The only way to do great work is to love what you do.",
  },
  {
    q: "Innovation distinguishes between a leader and a follower.",
    a: "Steve Jobs",
    c: "68",
    h: "Innovation distinguishes between a leader and a follower.",
  },
  {
    q: "Design is not just what it looks like and feels like. Design is how it works.",
    a: "Steve Jobs",
    c: "80",
    h: "Design is not just what it looks like and feels like. Design is how it works.",
  },
  {
    q: "Your time is limited, so don't waste it living someone else's life.",
    a: "Steve Jobs",
    c: "72",
    h: "Your time is limited, so don't waste it living someone else's life.",
  },
  {
    q: "Stay hungry, stay foolish.",
    a: "Steve Jobs",
    c: "42",
    h: "Stay hungry, stay foolish.",
  },
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // Maximum requests per window
const requestTimestamps: number[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove timestamps older than the window
  while (
    requestTimestamps.length > 0 &&
    requestTimestamps[0] < now - RATE_LIMIT_WINDOW
  ) {
    requestTimestamps.shift();
  }

  // Check if we've exceeded the rate limit
  if (requestTimestamps.length >= MAX_REQUESTS) {
    return true;
  }

  // Add current timestamp
  requestTimestamps.push(now);
  return false;
}

export async function GET() {
  // Check rate limit
  if (isRateLimited()) {
    console.log("Rate limit exceeded, using fallback quotes");
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return NextResponse.json(fallbackQuotes[randomIndex]);
  }

  try {
    // Try to fetch from the external API first
    const response = await axios.get<Quote[]>(
      "https://zenquotes.io/api/quotes/random",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 5000, // 5 second timeout
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
