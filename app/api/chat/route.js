import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textGenerationModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(process.env.ASTRA_DB_ENDPOINT ?? '', {
    namespace: process.env.ASTRA_DB_KEYSPACE
});

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages?.length) {
      return new Response(JSON.stringify({ error: "No messages received" }), { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content;
    let docContext = "";

    try {
      const embeddingResponse = await embeddingModel.embedContent(latestMessage);
      const vector = embeddingResponse?.embedding?.values;

      const collection = await db.collection("chatbot");
      const cursor = collection.find(null, {
        sort: { $vector: vector },
        limit: 5,
      });
      const documents = await cursor.toArray();
      
      docContext = documents.map((doc) => doc.description).join("\n");
    } catch (error) {
      console.error("Error generating embeddings:", error);
    }

    const systemPrompt = {
      role: "user",
      parts: [{ 
        text: `You are an AI Bot answering questions as Aswin in his askme bot.
        Format responses using markdown where applicable.
        Context: ${docContext}
        If the answer is not provided in the context, say:
        "I am sorry, I do not know the answer. Please contact email@aswinkrishna.com for more information."`
      }]
    };

    const formattedMessages = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const stream = await textGenerationModel.generateContentStream({
      contents: [systemPrompt, ...formattedMessages]
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}