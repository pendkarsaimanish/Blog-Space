import { Client, Account, Databases, ID } from "appwrite";

const process = import.meta.env;

export const client = new Client();

client
  .setEndpoint(process.VITE_APPWRITE_URL)
  .setProject(process.VITE_APPWRITE_PROJECT_ID)
  .setDevKey(process.VITE_APPWRITE_DEVKEY);

export const account = new Account(client);

export const databases = new Databases(client);

export { ID }