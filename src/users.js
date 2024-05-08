import { Client, Databases, Query } from "node-appwrite";

// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_URL)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID);

  const database = new Databases(client);
  const posts = database.listDocuments(
    process.env.VITE_APPWRITE_DATABASE_ID,
    process.env.VITE_APPWRITE_POST_COLLECTION_ID,
    Query.limit(4)
  );
  switch (req.query.type) {
    case "test":
      return res.json(req);
    case "getPosts":
      return res.json(posts);
    default:
      return res.json({ message: "Hell nah" });
  }
};
