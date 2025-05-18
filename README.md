# QuoteQuest - A Beautiful Quote Generator

QuoteQuest is a modern, responsive web application that generates inspirational quotes with a beautiful user interface. Built with Next.js and TypeScript, it offers a seamless experience for discovering and saving your favorite quotes.

## Features

- 🎯 Random quote generation
- ⏱️ Automatic quote refresh every 10 seconds
- 💖 Save favorite quotes
- 📋 Copy quotes to clipboard
- 🎨 Beautiful animations and transitions
- 🌓 Clean and modern UI
- 📱 Fully responsive design

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Heroicons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Palak-23/randomQuoteGenerator.git
cd randomQuoteGenerator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
randomQuoteGenerator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── favorites/
│   │   └── page.tsx
│   ├── components/
│   │   └── QuoteCard.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── theme.ts
│   └── types/
│       └── quote.ts
├── public/
└── package.json
```

## Features in Detail

### Quote Generation

- Fetches random quotes from an external API
- Includes fallback quotes if the API is unavailable
- Prevents immediate quote repetition

### Favorites System

- Save and manage favorite quotes
- Persistent storage using localStorage
- Easy removal of favorites

### UI/UX

- Smooth fade-in animations for quotes
- Responsive design for all screen sizes
- Intuitive navigation
- Clean and modern interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Palak Jaiswal
