import {
  Account,
  Avatars,
  Client,
  Databases,
  Query,
  Storage,
} from "node-appwrite";

const config = {
  endpoint: process.env.VITE_APPWRITE_URL || "",
  projectId: process.env.VITE_APPWRITE_PROJECT_ID || "",
  apiKey: process.env.APPWRITE_SERVER_ACCESS_AUTH || "",

  databaseId: process.env.VITE_APPWRITE_DATABASE_ID || "",

  // Post Collection
  postCollectionId: process.env.VITE_APPWRITE_POST_COLLECTION_ID || "",
};

// It's executed each time we get a request
export default async ({ req, res, log, error }: any) => {
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);

  const database = new Databases(client);
  const storage = new Storage(client);
  const account = new Account(client);
  const avatars = new Avatars(client);
  // const users = new Users(client);

  const posts = await database.listDocuments(
    config.databaseId,
    config.postCollectionId,
    [Query.limit(5)]
  );

  switch (req.query.type) {
    case "test":
      return res.json({
        id: process.env.VITE_APPWRITE_PROJECT_ID,
        name: posts,
      });
    case "getPosts":
      return res.json(posts);
    default:
      return res.json({ message: "No type specified / unknown type" });
  }
};
