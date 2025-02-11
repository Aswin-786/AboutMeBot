import { DataAPIClient} from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import data from "./data.json" with { type: "json" };
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(process.env.ASTRA_DB_ENDPOINT ?? '', {
    namespace: process.env.ASTRA_DB_KEYSPACE
});

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

const createCollection = async () => {
    console.log('creating collection');
    try {
        await db.createCollection("chatbot", {
            vector: {
                dimension: 768
            }
        });
    } catch (error) {
        console.log('already have collection')
    }
};

const loadData = async () => { 
    const collection = await db.collection("chatbot");
    for await (const { id, info, description } of data) {
        const chunks = await splitter.splitText(description);
        let i = 0;
        for await (const chunk of chunks) {
            const data = await model.embedContent(chunk); 

            const response = await collection.insertOne({
                document_id:id,
                info,
                description: chunk, 
                $vector: data.embedding.values,
            });
            i++;
        }
    }
    console.log('data added');
}

createCollection().then(() => loadData()).catch((e) => console.log(e));
