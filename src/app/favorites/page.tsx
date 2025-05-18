"use client";

import { useState, useEffect } from "react";
import { Quote } from "@/types/quote";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const handleRemoveFavorite = (quoteToRemove: Quote) => {
    const newFavorites = favorites.filter((fav) => fav.q !== quoteToRemove.q);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8] dark:bg-[#F5F1E8] transition-colors duration-200 px-4 py-24">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" passHref>
            <div
              className="p-2 rounded-full hover:bg-[#1E1E1E]/10 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Back to QuoteQuest"
            >
              <ArrowLeftIcon className="h-6 w-6 text-[#1E1E1E] dark:text-gray-300" />
            </div>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] dark:text-[#1E1E1E] text-center font-merriweather flex-grow">
            Your Favorite Quotes
          </h1>
          <div className="w-12" />
        </div>
        <div className="grid grid-cols-1 gap-8">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <QuoteCard
                key={fav.q}
                quote={fav}
                isFavorite={true}
                onToggleFavorite={() => handleRemoveFavorite(fav)}
              />
            ))
          ) : (
            <p className="text-center text-[#1E1E1E]/80 dark:text-[#1E1E1E]/80 text-xl">
              No favorites added yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
