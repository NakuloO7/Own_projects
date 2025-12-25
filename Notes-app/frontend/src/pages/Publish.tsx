import { Appbar } from "@/Components/Appbar";
import { BackendUrl } from "@/config";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const postBlog = async () => {
    const response = await axios.post(`${BackendUrl}/api/v1/blog`, {
        title,
        content
    }, {
        headers : {
            Authorization : localStorage.getItem("token")
        }
    });
    navigate(`/blog/${response.data.id}`);
  };

  return (
    <div>
      <Appbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Create New Blog Post
            </h1>
          </div>

          {/* Form */}
          <div className="p-6">
            <form
            onSubmit={async(e)=>{
                e.preventDefault();
                await postBlog();
            }}
             className="space-y-6">
              {/* Title Section */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Title
                </label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive title for your blog post"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Content Section */}
              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Content
                </label>
                <textarea
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  id="content"
                  name="content"
                  rows={12}
                  placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
                ></textarea>
                <p className="text-xs text-gray-500">
                  You can use Markdown formatting for headings, links, code
                  blocks, and more.
                </p>
              </div>

              {/* Publish Button Section */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
