import {
  Account,
  Avatars,
  Client,
  Databases,
  Query,
  Storage,
  Users,
} from "node-appwrite";

// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_URL)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_SERVER_ACCESS_AUTH);

  const database = new Databases(client);
  const storage = new Storage(client);
  const account = new Account(client);
  const avatars = new Avatars(client);
  const users = new Users(client);

  const posts = await database.listDocuments(
    process.env.VITE_APPWRITE_DATABASE_ID,
    process.env.VITE_APPWRITE_POST_COLLECTION_ID,
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
