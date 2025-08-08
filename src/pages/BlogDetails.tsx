import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Blog } from '../types';
import { useBlog } from '../contexts/BlogContext';
import Loader from '../components/Loader';

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blogs, loading } = useBlog();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (blogs.length > 0 && id) {
      const foundBlog = blogs.find(b => b.$id === id);
      setBlog(foundBlog || null);
    }
  }, [blogs, id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader size="large" className="h-64" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog post not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Blog Content */}
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-8">
            <div className="flex items-center space-x-2">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt={blog.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <Link
                    to={`/author/${blog.authorId}`}
                    className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {blog.authorName}
                  </Link>
                  {/* <span className="font-medium">{blog.authorName}</span> */}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{formatDate(blog.$createdAt)}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{estimateReadTime(blog.body)} min read</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag size={16} className="text-gray-400 mt-1" />
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {blog.body.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt={blog.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <Link
                  to={`/author/${blog.authorId}`}
                  className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {blog.authorName}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Published on {formatDate(blog.$createdAt)}
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              More Posts
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          More from {blog.authorName}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs
            .filter(b => b.authorId === blog.authorId && b.$id !== blog.$id)
            .slice(0, 2)
            .map((relatedBlog) => (
              <Link
                key={relatedBlog.$id}
                to={`/blog/${relatedBlog.$id}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {relatedBlog.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {relatedBlog.body}
                </p>
                <div className="flex items-center space-x-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatDate(relatedBlog.$createdAt)}</span>
                  <span>{estimateReadTime(relatedBlog.body)} min read</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;