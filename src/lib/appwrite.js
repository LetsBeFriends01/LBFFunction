import { Client, Databases } from "node-appwrite";

export const appwriteConfig = {
  // OTHER INTERFACE

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
  planInteractionCollectionId:
    process.env.VITE_APPWRITE_PLAN_INTERACTION_COLLECTION_ID,
  convoReceiptCollectionId:
    process.env.VITE_APPWRITE_CONVERSATION_RECEIPT_COLLECTION_ID,
  chatReceiptCollectionId:
    process.env.VITE_APPWRITE_CHATS_RECEIPT_COLLECTION_ID,

  // CHAT FEATURE

  messagesStorageId: process.env.VITE_APPWRITE_MESSAGES_STORAGE_ID,
  convoCollectionId: process.env.VITE_APPWRITE_CONVO_COLLECTION_ID,
  chatsCollectionId: process.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
  whoOwnConvoCollectionId:
    process.env.VITE_APPWRITE_WHO_OWN_CONVO_COLLECTION_ID,

  // VERIFYING

  verifyingStorageId: process.env.VITE_APPWRITE_VERIFYING_STORAGE_ID,
  verifyingCollectionId: process.env.VITE_APPWRITE_VERIFYING_COLLECTION_ID,

  // REVIEWS

  reviewsCollectionId: process.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID,

  likedReviewsCollectionId:
    process.env.VITE_APPWRITE_LIKED_REVIEWS_COLLECTION_ID,

  // FRIEND LIST

  friendListCollectionId: process.env.VITE_APPWRITE_FRIEND_LIST_COLLECTION_ID,

  // API KEYS

  serverAccessAuth: process.env.APPWRITE_SERVER_ACCESS_AUTH,
};

export const client = new Client()
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectIdL);

export const database = new Databases(client);
