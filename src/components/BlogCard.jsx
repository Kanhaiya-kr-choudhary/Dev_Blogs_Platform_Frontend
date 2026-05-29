import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">

            {/* Cover Image */}
            {blog.coverImage && (
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
            )}

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-3">
                {blog.tags?.map((tag, i) => (
                    <span
                        key={i}
                        className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>

            {/* Content Preview */}
            <p className="text-gray-500 text-sm mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 150) + "...",
                }}
            />

            {/* Footer */}
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                    ✍️ {blog.author?.username}
                </span>
                <Link
                    to={`/blog/${blog._id}`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                    Read More →
                </Link>
            </div>

        </div>
    );
}

export default BlogCard;