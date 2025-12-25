import { Appbar } from "@/Components/Appbar";
import { Blogcard } from "@/Components/Blogcard";
import { BlogSkeleton } from "@/Components/BlogSkeleton";
import { useBlogs } from "@/hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Latest Blog Posts
              </h1>
              <p className="text-gray-600 text-lg">
                Discover insights, tutorials, and stories from our community
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div>
                <Blogcard
                key={blog.id}
                id={blog.id}
                username={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate="2025-06-10"
              />
              </div>
            ))}
          </div>
        </div>

        {/* Load more section */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
              Load More Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
