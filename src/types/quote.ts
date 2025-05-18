export interface Quote {
  q: string;
  a: string;
  c: string;
  h: string;
}

export interface QuoteState {
  currentQuote: Quote | null;
  favorites: Quote[];
  history: Quote[];
}
