import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Plus, BookOpen, Eye, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { Blog } from '../types';
import { useBlog } from '../contexts/BlogContext';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { toggleTheme, isDark } = useTheme()
    const { blogs, loading } = useBlog()
    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

    useEffect(() => {

        if (user) {
            if (user.prefs.theme === 'dark') {
                document.documentElement.classList.add("dark");
            }
        }

        if (blogs.length > 0 && user) {
            const uBlogs = blogs.filter(blog => blog.authorId === user?.$id)
            setUserBlogs(uBlogs);
        }
    }, [blogs, user]);

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">Please log in to access your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {user.name}! 👋
                </h1>
                {/* <p className="text-gray-600 dark:text-gray-300">
                    Here's an overview of your blogging journey
                </p> */}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {userBlogs.length}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Published Posts
                            </p>
                        </div>
                        <BookOpen className={"w-8 h-8 text-blue-600 dark:text-blue-400"} />
                    </div>
                </div>
            </div>


            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/new-blog"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <Plus size={20} />
                        <span>Write New Post</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                        <span>Edit Profile</span>
                    </Link>
                </div>
            </div>

            {/* Recent Posts */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Your Recent Posts
                    </h2>
                    <Link
                        to="/new-blog"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                        Create New Post →
                    </Link>
                </div>

                {loading ? (
                    <Loader size="large" className="h-64" />
                ) : userBlogs.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No posts yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Start your blogging journey by writing your first post
                        </p>
                        <Link
                            to="/new-blog"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            <Plus size={20} />
                            <span>Write Your First Post</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userBlogs.map((blog) => (
                            <BlogCard key={blog.$id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;