import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
  Users,
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
  const users = new Users(client);

  console.log("Payload", req.body);
  console.log("variables", req.variables);
  console.log("variables2", req.variables["APPWRITE_FUNCTION_EVENT_DATA"]);
  res.json({ req: req, log: log, error });

  if (req.body.whoLiked) {
    console.log("Payload with conditional", req.body);
    return res.json({ payload: req.body.whoLiked });
  }

  return res.json({ payload: req.body.whoLiked });
};