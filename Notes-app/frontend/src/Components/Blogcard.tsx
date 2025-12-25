import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Link } from "react-router-dom";

interface Blogcard {
  id : string;
  username: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const Blogcard = ({
  id,
  username,
  title,
  content,
  publishedDate,
}: Blogcard) => {
  //format the published date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  // Get user initials for avatarI
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link to={`/blog/${id}`} >
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 overflow-hidden">
      {/* Header with user info */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600">
            <AvatarFallback className="text-white font-medium text-sm">
              {getUserInitials(username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{username}</p>
            <p className="text-sm text-gray-500">{formatDate(publishedDate)}</p>
          </div>
        </div>

        {/* Blog title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
          {title}
        </h2>

        {/* Blog content preview */}
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {content.slice(0, 250) + "..."}
        </p>

        {/* Read more section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
            Read more
          </button>
          <div className="flex items-center space-x-4 text-gray-400">
            <button className="hover:text-blue-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button className="hover:text-blue-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="hover:text-blue-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};
