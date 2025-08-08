import { createContext, useContext, useEffect, useState } from "react";
import { Blog, BlogContextType } from "../types";
import { listBlogPosts } from "../lib/database1"

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoading(true)
                const b = await listBlogPosts()
                if (b) {
                    setBlogs(b.documents)
                }
            } catch (err) {
                setError((err as Error).message)
            } finally { setLoading(false) }
        }
        getBlogs()
    }, [])

    return <BlogContext.Provider value={{ blogs, setBlogs, loading, error }}>{children}</BlogContext.Provider>
}

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an BlogProvider');
    }
    return context;
};