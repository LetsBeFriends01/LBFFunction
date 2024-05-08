import { appwriteConfig } from "./lib/appwrite";

// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  switch (req.query.type) {
    case "test":
      return res.json({ id: appwriteConfig.databaseId });
    case "getPosts":
      return res.json(posts);
    default:
      return res.json({ message: "Hell nah" });
  }
};
