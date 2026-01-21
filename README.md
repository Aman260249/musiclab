This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



🎵 MusicLab – Full Stack Music Streaming App

MusicLab is a modern music streaming web application developed by me (CodeLab). It allows users to listen to music, like their favorite songs, and manage their listening experience. An admin panel is also included to securely add new music to the database.

🚀 Features

1️⃣ Real-time Database
Songs are updated instantly using Firebase Firestore, ensuring real-time data synchronization.

2️⃣ Admin Panel
A secure dashboard where admins can add new songs with details such as:

Title

Artist

Album

Image

Audio file

3️⃣ Authentication Layer
Only authorized admins can upload music using Firebase Authentication
(Admin access is restricted to amytricks26024@gmail.com).

4️⃣ Dual-Layer Security
Admin access is protected using:

Email verification

A secret PIN prompt

5️⃣ Music Player
A fully functional music player featuring:

Play / Pause

Next / Previous track

Volume control

Progress seek bar

6️⃣ Personalized Library
User-specific features including:

Liked Songs

Recently Played
All user data is stored securely.

7️⃣ Dynamic UI
A responsive and modern interface that works smoothly on both mobile and desktop devices.

🛠️ Tech Stack

Frontend

Next.js 14

React.js

Framer Motion (for animations)

Styling

Pure CSS3 (custom modern UI)

Backend / Database

Firebase Firestore

Authentication

Firebase Authentication

State Management

React Context API (MusicContext)

Icons

Lucide React

📁 Project Structure
musiclab/
├── app/
│   ├── admin/           # Admin Panel Page
│   ├── context/         # MusicContext (Live Data & Auth Logic)
│   ├── data/            # Local data files (Fallback)
│   ├── styles/          # All CSS Files
│   └── components/      # UI Components (SongCard, Player, Sidebar)
├── public/              # Static assets (Logos, Default Images)
└── .env.local           # Environment Variables (Secrets)

⚙️ Setup & Installation

1️⃣ Clone the repository.

2️⃣ Install all dependencies using:

npm install


3️⃣ Create a .env.local file and add your Firebase credentials and admin details:

NEXT_PUBLIC_ADMIN_EMAIL=
NEXT_PUBLIC_ADMIN_PIN=


4️⃣ Start the local development server:

npm run dev


The application will run at http://localhost:3000 
