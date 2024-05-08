import { Query } from "node-appwrite";
import { appwriteConfig, database } from "./lib/appwrite";

// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  switch (req.query.type) {
    case "test":
      return res.json(req);

    case "getListPost": {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.limit(10)]
      );

      return res.json(posts);
    }

    default:
      return res.notFound();
  }
};
