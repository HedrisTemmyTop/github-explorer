# GitHub Explorer

A modern web application for exploring GitHub repositories with advanced search capabilities and filters.

## Features

- 🔍 Search repositories by name, description, or topic
- ⭐ Filter by stars, language, and license
- 📊 Sort by stars, forks, or last updated
- 📱 Responsive design with modern UI
- 🔄 Real-time search with debouncing
- 📑 Pagination support
- 🔗 URL state synchronization

## Prerequisites

- Node.js (v16 or higher)
- npm or bun

## Installation

1. Clone the repository:

```bash
git clone https://github.com/HedrisTemmyTop/github-explorer.git
cd github-explorer
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

## Running the Project

1. Start the development server:

```bash
npm run dev
# or
bun dev
```

2. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
bun run build
```

The build files will be created in the `dist` directory.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- GitHub REST API
- Lucide React (for icons)

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── constants.ts   # Application constants
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
