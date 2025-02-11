===========================================
  AskMe Bot - AI Chatbot by Aswin 🤖
===========================================

🚀 AskMe Bot is an AI-powered chatbot built using:
   - Next.js (Server Components)
   - Google Gemini AI (Natural Language Processing)
   - Astra DB (Vector Search)
   - PostHog (Analytics & Tracking)

🔗 Live Demo: https://askmebot.aswinkrishna.com/

--------------------------------------------
✨ FEATURES
--------------------------------------------
🧠 AI-powered chatbot using Google Gemini AI
📡 Streaming Responses for real-time conversation
🏎️ Built with Next.js 13+ (Server Components)
📊 User Interaction Tracking with PostHog
🔥 Intelligent Vector Search using Astra DB
🎨 Beautiful UI with TailwindCSS
📈 Event Tracking & Analytics

--------------------------------------------
📂 PROJECT STRUCTURE
--------------------------------------------
/askme-bot
│── app/                 # Next.js App Router
│── components/          # UI Components
│── public/              # Static assets
│── styles/              # Global styles
│── utils/               # Helper functions
│── providers.js         # PostHog & Global Providers
│── .env                 # Environment Variables
│── README.txt           # Project Documentation
│── package.json         # Dependencies
│── tsconfig.json        # TypeScript Configuration

--------------------------------------------
🚀 GETTING STARTED
--------------------------------------------
1️⃣ Clone the Repository:
   git clone https://github.com/yourgithub/askmebot.git
   cd askmebot

2️⃣ Install Dependencies:
   npm install

3️⃣ Set Up Environment Variables:
   Create a `.env.local` file and add:

   NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   GEMINI_API_KEY=your-google-gemini-api-key
   ASTRA_DB_APPLICATION_TOKEN=your-astra-db-token
   ASTRA_DB_ENDPOINT=your-astra-db-endpoint
   ASTRA_DB_KEYSPACE=your-db-keyspace

4️⃣ Run the Development Server:
   npm run dev

   🔗 Open http://localhost:3000 in your browser.

--------------------------------------------
📊 ANALYTICS WITH POSTHOG
--------------------------------------------
- Tracks user messages & AI responses in real-time.
- Captures session data & user behavior.
- Enables event tracking & user engagement insights.

