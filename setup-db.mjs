import { Client, Databases, Storage, Permission, IndexType } from "node-appwrite";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env manually
const envPath = resolve(process.cwd(), ".env");
const envContent = readFileSync(envPath, "utf-8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) envVars[key.trim()] = rest.join("=").trim();
}

const ENDPOINT = envVars["NEXT_PUBLIC_APPWRITE_HOST_URL"];
const PROJECT_ID = envVars["NEXT_PUBLIC_APPWRITE_PROJECT_ID"];
const API_KEY = envVars["APPWRITE_API_KEY"];

const db = "main-stackflow";
const questionCollection = "questions";
const answerCollection = "answers";
const commentCollection = "comments";
const voteCollection = "votes";
const questionAttachmentBucket = "question-attachment";

console.log("Connecting to Appwrite...");
console.log("Endpoint:", ENDPOINT);
console.log("Project:", PROJECT_ID);

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

async function setup() {
  // --- DATABASE ---
  try {
    await databases.get(db);
    console.log("✅ Database already exists:", db);
  } catch {
    await databases.create(db, db);
    console.log("✅ Database created:", db);
  }

  // --- QUESTIONS COLLECTION ---
  try {
    await databases.getCollection(db, questionCollection);
    console.log("✅ Collection already exists: questions");
  } catch {
    await databases.createCollection(db, questionCollection, questionCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);
    console.log("✅ Collection created: questions");
    await Promise.all([
      databases.createStringAttribute(db, questionCollection, "title", 100, true),
      databases.createStringAttribute(db, questionCollection, "content", 10000, true),
      databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
      databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
      databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
    ]);
    console.log("✅ Question attributes created");
  }

  // --- ANSWERS COLLECTION ---
  try {
    await databases.getCollection(db, answerCollection);
    console.log("✅ Collection already exists: answers");
  } catch {
    await databases.createCollection(db, answerCollection, answerCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);
    console.log("✅ Collection created: answers");
    await Promise.all([
      databases.createStringAttribute(db, answerCollection, "content", 10000, true),
      databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
      databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
    ]);
    console.log("✅ Answer attributes created");
  }

  // --- COMMENTS COLLECTION ---
  try {
    await databases.getCollection(db, commentCollection);
    console.log("✅ Collection already exists: comments");
  } catch {
    await databases.createCollection(db, commentCollection, commentCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);
    console.log("✅ Collection created: comments");
    await Promise.all([
      databases.createStringAttribute(db, commentCollection, "content", 10000, true),
      databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
      databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
      databases.createStringAttribute(db, commentCollection, "type", 20, true),
    ]);
    console.log("✅ Comment attributes created");
  }

  // --- VOTES COLLECTION ---
  try {
    await databases.getCollection(db, voteCollection);
    console.log("✅ Collection already exists: votes");
  } catch {
    await databases.createCollection(db, voteCollection, voteCollection, [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);
    console.log("✅ Collection created: votes");
    await Promise.all([
      databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
      databases.createStringAttribute(db, voteCollection, "type", 20, true),
      databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
      databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
    ]);
    console.log("✅ Vote attributes created");
  }

  // --- STORAGE BUCKET ---
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("✅ Storage bucket already exists");
  } catch {
    await storage.createBucket(
      questionAttachmentBucket,
      questionAttachmentBucket,
      [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ],
      false,
      undefined,
      undefined,
      ["jpg", "png", "gif", "jpeg", "webp", "heic"]
    );
    console.log("✅ Storage bucket created");
  }

  console.log("\n🎉 All done! Database, collections and storage are ready.");
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
