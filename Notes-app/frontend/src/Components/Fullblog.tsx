import type { Blog } from "@/hooks";
import { Appbar } from "./Appbar";

export const Fullblog = ({ blog }: { blog: Blog }) => {
  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get a short excerpt from the content
  const getExcerpt = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Appbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Appbar />
      </header>

      {/* Page content with padding and spacing */}
      <main className="pt-20 px-4 sm:px-8 md:px-16 max-w-3xl mx-auto">
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>

          {/* Content preview */}
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {getExcerpt(blog.content)}
          </p>

          {/* Author info */}
          <div className="flex items-center pt-4 border-t border-gray-100">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-200 shadow-sm">
              <span className="text-white text-lg font-semibold">
                {getUserInitials(blog.author.name)}
              </span>
            </div>
            <span className="ml-3 font-medium text-gray-800">
              {blog.author.name}
            </span>
          </div>
        </article>
      </main>
    </div>
  );
};
