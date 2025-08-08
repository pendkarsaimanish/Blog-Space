import { Models } from "appwrite";
import React from "react";

export interface AppwriteUser extends Models.User {}

export interface User extends Models.Document {
  userId: string;
  username: string;
  joinedAt: string;
}

export interface Blog extends Models.Document {
  title: string;
  body: string;
  tags: Array<string>;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: AppwriteUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppwriteUser | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  userLoading: boolean;
  error: string | null;
}

export interface BlogContextType {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  loading: boolean;
  error: string | null;
}


export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}