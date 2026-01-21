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



🎵 MusicLab - Full Stack Music Streaming App

MusicLab ek modern music streaming web application hai jise maine (CodeLab) banaya hai. Isme users gaane sun sakte hain, apne pasandida gaane like kar sakte hain aur Admin panel ke zariye naya music database mein add kar sakte hain.

🚀 Features
1 : Real-time Database: Firebase Firestore ka use karke gaane instant update hote hain.

2 : Admin Panel: Ek secure dashboard jahan se naye gaane (Title, Artist, Album, Image, Audio) add kiye ja sakte hain.

3 : Authentication Layer: Firebase Auth ka use karke sirf authorized admin (amytricks26024@gmail.com) hi upload kar sakta hai.

4 :Dual-Layer Security: Admin access ke liye Email verification aur ek Secret PIN Prompt ka  
  use kiya gaya hai.

5 : Music Player: Fully functional player jisme Play/Pause, Skip Next/Previous, Volume        
    control aur Progress seek bar laga hai.

6 : Personalized Library: Users ke liye 'Liked Songs' aur 'Recently Played' ka feature jo user-specific data store karta hai.

7 : Dynamic UI: Responsive design jo mobile aur desktop dono par smooth chalta hai.

🛠️ Tech Stack
Frontend: Next.js 14, React.js, Framer Motion (Animations ke liye).

Styling: Pure CSS3 (Custom Modern UI).

Backend/Database: Firebase Firestore.

Auth: Firebase Authentication.

State Management: React Context API (MusicContext).

Icons: Lucide-React.

📁 Project Structure
Plaintext

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

1 : Repository clone karein.

2 : npm install karke saari dependencies install karein.

3 : .env.local file banayein aur apna Firebase credentials aur Admin details dalein:

4 : NEXT_PUBLIC_ADMIN_EMAIL

5 : NEXT_PUBLIC_ADMIN_PIN

6 : npm run dev se local server start karein.