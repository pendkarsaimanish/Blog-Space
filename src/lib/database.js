import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const process = import.meta.env;

const DOCUMENT_ID = process.VITE_APPWRITE_DATABASE;
const USER_COLLECTION = process.VITE_APPWRITE_USERS_COLLECTION;
const BLOG_COLLECTION = process.VITE_APPWRITE_BLOG_COLLECTION;

export async function createUser(userId, username) {
  return await databases.createDocument(
    DOCUMENT_ID,
    USER_COLLECTION,
    ID.unique(),
    {
      userId,
      username,
      joinedAt: new Date(),
    }
  );
}

export async function getUser(userId) {
  return await databases.listDocuments(DOCUMENT_ID, USER_COLLECTION, [
    Query.equal("userId", userId),
  ]);
}

export async function updateUser() { }

export async function createBlogPost(title, body, tags, authorId, authorName, createdAt, updatedAt) {
  return await databases.createDocument(
    DOCUMENT_ID,
    BLOG_COLLECTION,
    ID.unique(),
    {
      title,
      body,
      tags,
      authorId,
      authorName,
      createdAt,
      updatedAt
    }
  )

}

export async function listBlogPosts() {
  return await databases.listDocuments(DOCUMENT_ID, BLOG_COLLECTION)
}

export async function updateBlogPost() { }
export async function deleteBlogPost() { }
