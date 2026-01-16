# Mazaj Frontend

An AI-powered DJ party application where users can create parties, invite friends, and request songs through an intelligent AI DJ that curates music based on the party vibe.

## Description

Mazaj is a collaborative music party platform that uses AI to manage song requests. Users create parties with specific vibes (e.g., "upbeat 2000s pop, no slow songs"), and an AI DJ evaluates each song request to ensure it matches the party's mood. The app features real-time queue synchronization, YouTube audio playback, and a chat interface for interacting with the AI DJ.

## User Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- User account (email/password registration)

## Technologies

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **react-youtube** - YouTube player integration
- **Material Symbols** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd "Mazaj Frontend"
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.sample .env
```

4. Update `.env` with your backend API URL

5. Start development server
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── navbar.jsx
│   │   └── footer.jsx
│   ├── party/
│   │   ├── chatInterface.jsx
│   │   ├── messageBubble.jsx
│   │   ├── nowPlaying.jsx
│   │   ├── queueList.jsx
│   │   ├── hostCard.jsx
│   │   ├── joinCard.jsx
│   │   └── partyListItem.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       └── input.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Auth.jsx
│   ├── Dashboard.jsx
│   ├── CreateParty.jsx
│   └── PartyRoom.jsx
├── config/
│   └── api.js
├── App.jsx
└── main.jsx
```

## Features

- User authentication (signup/login)
- Create parties with custom vibe descriptions
- AI-powered song request evaluation
- Real-time queue synchronization across users
- YouTube audio playback
- Chat interface with AI DJ
- Party member tracking
