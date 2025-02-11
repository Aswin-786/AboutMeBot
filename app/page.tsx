import Chat from "@/components/Chat";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AskMe Bot - AI Chatbot for Aswin | AI-Powered Assistant</title>
        <meta name="description" content="AskMe Bot is an AI chatbot that knows everything about Aswin Krishna. Get instant answers from AI." />
        <meta name="robots" content="index, follow" />
      </Head>
      <Chat />
    </>
  );
}
