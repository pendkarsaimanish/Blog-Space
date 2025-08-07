import { account, ID } from "./appwrite";

export async function createAppwriteUser(email, password, name ) {
  return await account.create(ID.unique(), email, password, name);
}

export async function loginUser(emailId, password) {
  return await account.createEmailPasswordSession(emailId, password);
}

export async function getAppwriteUser() {
  return await account.get();
}

export async function deleteUserSession() { 
    return await account.deleteSession('current')
}