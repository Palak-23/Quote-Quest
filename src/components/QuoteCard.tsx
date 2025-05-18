import { Quote } from "@/types/quote";
import { useState } from "react";
import { HeartIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${quote.q} - ${quote.a}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-lg p-12 flex flex-col justify-between"
      style={{ borderRadius: "2rem" }}
    >
      <div className="mb-8">
        <p className="text-3xl font-semibold text-[#222] leading-snug mb-4">
          "{quote.q}"
        </p>
        <p className="text-xl text-gray-400 font-medium text-right">
          — {quote.a}
        </p>
      </div>

      <div className="flex justify-start space-x-4 w-full">
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full hover:bg-[#1E1E1E]/10 dark:hover:bg-gray-700 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-[#1E1E1E]" />
          ) : (
            <HeartIcon className="h-6 w-6 text-[#1E1E1E]/60 dark:text-gray-400" />
          )}
        </button>

        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full hover:bg-[#1E1E1E]/10 dark:hover:bg-gray-700 transition-colors"
          aria-label="Copy to clipboard"
        >
          <ClipboardIcon className="h-6 w-6 text-[#1E1E1E]/60 dark:text-gray-400" />
        </button>
      </div>

      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-4 right-4 bg-[#1E1E1E] text-white px-4 py-2 rounded-full text-sm"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
}
