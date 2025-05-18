"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import QuoteCard from "@/components/QuoteCard";
import { fetchRandomQuote } from "@/lib/api";
import { useTheme } from "@/lib/theme";
import { Quote } from "@/types/quote";
import Link from "next/link";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [quoteHistory, setQuoteHistory] = useState<Quote[]>([]);
  const { theme, toggleTheme } = useTheme();

  const fetchNewQuote = async () => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }

    try {
      let newQuote: Quote;
      let attempts = 0;
      const maxAttempts = 5; // Maximum attempts to find a non-repeating quote

      do {
        newQuote = await fetchRandomQuote();
        attempts++;
        // If we've tried too many times, clear the history and start fresh
        if (attempts >= maxAttempts) {
          setQuoteHistory([]);
          break;
        }
      } while (quoteHistory.some((q) => q.q === newQuote.q));

      setQuote(newQuote);
      setQuoteHistory((prev) => [...prev, newQuote].slice(-10)); // Keep last 10 quotes in history
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    fetchNewQuote();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quote) {
      timer = setTimeout(() => {
        fetchNewQuote();
      }, 10000); // 10 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [quote, fetchNewQuote]);

  const toggleFavorite = () => {
    if (!quote) return;

    const isFavorite = favorites.some((fav) => fav.q === quote.q);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.q !== quote.q);
    } else {
      newFavorites = [...favorites, quote];
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const shareQuote = async () => {
    if (!quote) return;

    const text = `${quote.q} - ${quote.a}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QuoteQuest",
          text,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8] dark:bg-[#F5F1E8] transition-colors duration-200">
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-grow text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] dark:text-[#1E1E1E] mb-2 font-merriweather fade-in fade-in-1">
              QuoteQuest
            </h1>
            <p className="text-xl md:text-2xl text-[#1E1E1E]/80 dark:text-[#1E1E1E]/80 text-center max-w-2xl mx-auto fade-in fade-in-2">
              Discover Words That Matter
            </p>
          </div>
          <Link href="/favorites" passHref>
            <div
              className="p-2 rounded-full hover:bg-[#1E1E1E]/10 dark:hover:bg-gray-700 transition-colors cursor-pointer fade-in fade-in-3"
              aria-label="View Favorite Quotes"
            >
              <HeartIconSolid className="h-6 w-6 text-[#1E1E1E] dark:text-gray-300" />
            </div>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto fade-in fade-in-3">
          {isInitialLoad ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-[#1E1E1E]/30 border-t-[#1E1E1E] rounded-full"
              />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {quote && (
                <motion.div
                  key={quote.q}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <QuoteCard
                    quote={quote}
                    isFavorite={favorites.some((fav) => fav.q === quote.q)}
                    onToggleFavorite={toggleFavorite}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchNewQuote}
              className="px-8 py-3 bg-[#1E1E1E] text-white rounded-full shadow-lg hover:bg-[#1E1E1E]/90 transition-colors font-medium"
            >
              New Quote
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
}
