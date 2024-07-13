import { Account, Avatars, Client, Databases, Storage, Users, } from "node-appwrite";
const config = {
    projectIdL: process.env.VITE_APPWRITE_PROJECT_ID,
    url: process.env.VITE_APPWRITE_URL,
    databaseId: process.env.VITE_APPWRITE_DATABASE_ID,
    storageId: process.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: process.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: process.env.VITE_APPWRITE_POST_COLLECTION_ID,
    likedPostCollectionId: process.env.VITE_APPWRITE_LIKED_POST_COLLECTION_ID,
    savesCollectionId: process.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    // PLANS
    plansCollectionId: process.env.VITE_APPWRITE_PLANS_COLLECTION_ID,
    planInteractionCollectionId: process.env.VITE_APPWRITE_PLAN_INTERACTION_COLLECTION_ID,
    convoReceiptCollectionId: process.env.VITE_APPWRITE_CONVERSATION_RECEIPT_COLLECTION_ID,
    chatReceiptCollectionId: process.env.VITE_APPWRITE_CHATS_RECEIPT_COLLECTION_ID,
    // CHAT FEATURE
    messagesStorageId: process.env.VITE_APPWRITE_MESSAGES_STORAGE_ID,
    convoCollectionId: process.env.VITE_APPWRITE_CONVO_COLLECTION_ID,
    chatsCollectionId: process.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
    whoOwnConvoCollectionId: process.env.VITE_APPWRITE_WHO_OWN_CONVO_COLLECTION_ID,
    // VERIFYING
    verifyingStorageId: process.env.VITE_APPWRITE_VERIFYING_STORAGE_ID,
    verifyingCollectionId: process.env.VITE_APPWRITE_VERIFYING_COLLECTION_ID,
    // REVIEWS
    reviewsCollectionId: process.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID,
    likedReviewsCollectionId: process.env.VITE_APPWRITE_LIKED_REVIEWS_COLLECTION_ID,
    // FRIEND LIST
    friendListCollectionId: process.env.VITE_APPWRITE_FRIEND_LIST_COLLECTION_ID,
    // API KEYS
    serverAccessAuth: process.env.APPWRITE_SERVER_ACCESS_AUTH,
};
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
    const client = new Client()
        .setEndpoint(config.url)
        .setProject(config.projectIdL)
        .setKey(config.serverAccessAuth);
    const database = new Databases(client);
    const storage = new Storage(client);
    const account = new Account(client);
    const avatars = new Avatars(client);
    const users = new Users(client);
    //   console.log("Payload", req.headers["x-appwrite-event"].includes("delete"));
    // // USER POSTS LIKES
    // if (req.body.whoLiked && req.body.postId) {
    //   if (req.headers["x-appwrite-event"].includes("create")) {
    //     console.log("CREATED!");
    //     console.log("body :", req.body);
    //     database.updateDocument(
    //       config.databaseId,
    //       config.postCollectionId,
    //       req.body.postId.$id,
    //       {
    //         totalLikes: req.body.postId.totalLikes + 1,
    //       }
    //     );
    //   }
    //   if (req.headers["x-appwrite-event"].includes("delete")) {
    //     console.log("DELETED!");
    //     console.log("body :", req.body);
    //     database.updateDocument(
    //       config.databaseId,
    //       config.postCollectionId,
    //       req.body.postId.$id,
    //       {
    //         totalLikes: req.body.postId.totalLikes - 1,
    //       }
    //     );
    //   }
    // }
    // console.log("headers", req.headers["x-appwrite-event"]);
    //   USER REVIEW LIKES
    if (req.body.whoLiked && req.body.reviewId) {
        if (req.headers["x-appwrite-event"].includes("create")) {
            console.log("LIKED REVIEW!");
            console.log("body :", req.body);
            console.log("totalLikes :", req.body.reviewId.totalLikes);
            console.log(config.databaseId, config.reviewsCollectionId, req.body.reviewId.$id);
            database.updateDocument(config.databaseId, config.reviewsCollectionId, req.body.reviewId.$id, {
                location: "In the app",
                totalLikes: req.body.reviewId.totalLikes + 1,
            });
        }
        if (req.headers["x-appwrite-event"].includes("delete")) {
            console.log("UNLIKED REVIEW!");
            console.log("body :", req.body);
            console.log("totalLikes :", req.body.reviewId.totalLikes);
            console.log(config.databaseId, config.reviewsCollectionId, req.body.reviewId.$id);
            database.updateDocument(config.databaseId, config.reviewsCollectionId, req.body.reviewId.$id, {
                location: "In the app",
                totalLikes: req.body.reviewId.totalLikes - 1,
            });
        }
    }
    return res.json({ payload: req.body.whoLiked });
};
