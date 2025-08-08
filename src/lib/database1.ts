import { Blog } from "../types";
import { databases, ID } from "./appwrite";

const process = import.meta.env;

const DOCUMENT_ID = process.VITE_APPWRITE_DATABASE;
const USER_COLLECTION = process.VITE_APPWRITE_USERS_COLLECTION;
const BLOG_COLLECTION = process.VITE_APPWRITE_BLOG_COLLECTION;


export async function listBlogPosts() {
  return await databases.listDocuments<Blog>(DOCUMENT_ID, BLOG_COLLECTION)
}

export async function createBlogPost(title, body, tags, authorId, authorName, createdAt, updatedAt) {
  return await databases.createDocument<Blog>(
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