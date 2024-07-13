var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
import { Account, Avatars, Client, Databases, Storage, Users, } from "node-appwrite";
const config = {
    projectIdL: (_a = process.env.VITE_APPWRITE_PROJECT_ID) !== null && _a !== void 0 ? _a : "",
    url: (_b = process.env.VITE_APPWRITE_URL) !== null && _b !== void 0 ? _b : "",
    databaseId: (_c = process.env.VITE_APPWRITE_DATABASE_ID) !== null && _c !== void 0 ? _c : "",
    storageId: (_d = process.env.VITE_APPWRITE_STORAGE_ID) !== null && _d !== void 0 ? _d : "",
    userCollectionId: (_e = process.env.VITE_APPWRITE_USER_COLLECTION_ID) !== null && _e !== void 0 ? _e : "",
    postCollectionId: (_f = process.env.VITE_APPWRITE_POST_COLLECTION_ID) !== null && _f !== void 0 ? _f : "",
    likedPostCollectionId: (_g = process.env.VITE_APPWRITE_LIKED_POST_COLLECTION_ID) !== null && _g !== void 0 ? _g : "",
    savesCollectionId: (_h = process.env.VITE_APPWRITE_SAVES_COLLECTION_ID) !== null && _h !== void 0 ? _h : "",
    // PLANS
    plansCollectionId: (_j = process.env.VITE_APPWRITE_PLANS_COLLECTION_ID) !== null && _j !== void 0 ? _j : "",
    planInteractionCollectionId: (_k = process.env.VITE_APPWRITE_PLAN_INTERACTION_COLLECTION_ID) !== null && _k !== void 0 ? _k : "",
    convoReceiptCollectionId: (_l = process.env.VITE_APPWRITE_CONVERSATION_RECEIPT_COLLECTION_ID) !== null && _l !== void 0 ? _l : "",
    chatReceiptCollectionId: (_m = process.env.VITE_APPWRITE_CHATS_RECEIPT_COLLECTION_ID) !== null && _m !== void 0 ? _m : "",
    // CHAT FEATURE
    messagesStorageId: (_o = process.env.VITE_APPWRITE_MESSAGES_STORAGE_ID) !== null && _o !== void 0 ? _o : "",
    convoCollectionId: (_p = process.env.VITE_APPWRITE_CONVO_COLLECTION_ID) !== null && _p !== void 0 ? _p : "",
    chatsCollectionId: (_q = process.env.VITE_APPWRITE_CHATS_COLLECTION_ID) !== null && _q !== void 0 ? _q : "",
    whoOwnConvoCollectionId: (_r = process.env.VITE_APPWRITE_WHO_OWN_CONVO_COLLECTION_ID) !== null && _r !== void 0 ? _r : "",
    // VERIFYING
    verifyingStorageId: (_s = process.env.VITE_APPWRITE_VERIFYING_STORAGE_ID) !== null && _s !== void 0 ? _s : "",
    verifyingCollectionId: (_t = process.env.VITE_APPWRITE_VERIFYING_COLLECTION_ID) !== null && _t !== void 0 ? _t : "",
    // REVIEWS
    reviewsCollectionId: process.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID,
    likedReviewsCollectionId: (_u = process.env.VITE_APPWRITE_LIKED_REVIEWS_COLLECTION_ID) !== null && _u !== void 0 ? _u : "",
    // FRIEND LIST
    friendListCollectionId: (_v = process.env.VITE_APPWRITE_FRIEND_LIST_COLLECTION_ID) !== null && _v !== void 0 ? _v : "",
    // API KEYS
    serverAccessAuth: (_w = process.env.APPWRITE_SERVER_ACCESS_AUTH) !== null && _w !== void 0 ? _w : "",
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
    // USER POSTS LIKES
    if (req.body.whoLiked && req.body.postId) {
        if (req.headers["x-appwrite-event"].includes("create")) {
            console.log("CREATED!");
            console.log("body :", req.body);
            database.updateDocument(config.databaseId, config.postCollectionId, req.body.postId.$id, {
                totalLikes: req.body.postId.totalLikes + 1,
            });
        }
        if (req.headers["x-appwrite-event"].includes("delete")) {
            console.log("DELETED!");
            console.log("body :", req.body);
            database.updateDocument(config.databaseId, config.postCollectionId, req.body.postId.$id, {
                totalLikes: req.body.postId.totalLikes - 1,
            });
        }
    }
    //   USER REVIEW LIKES
    if (req.body.whoLiked && req.body.reviewId) {
        if (req.headers["x-appwrite-event"].includes("create")) {
            console.log("What");
            database.updateDocument(config.databaseId, config.reviewsCollectionId, req.body.reviewId.$id, {
                location: "In the app",
                totalLikes: req.body.reviewId.totalLikes + 1,
            });
        }
        if (req.headers["x-appwrite-event"].includes("delete")) {
            console.log("What");
            database.updateDocument(config.databaseId, config.reviewsCollectionId, req.body.reviewId.$id, {
                location: "In the app",
                totalLikes: req.body.reviewId.totalLikes - 1,
            });
        }
    }
    return res.json({ payload: req.body.whoLiked });
};
