import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                 const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
                setBlog(res.data);
            } catch (error) {
                toast.error("Blog nahi mila!");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Delete karna chahte ho?")) return;
        try {
           await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Blog deleted ✅");
            navigate("/");
        } catch (error) {
            toast.error("Delete nahi hua!");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Cover Image */}
            {blog.coverImage && (
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-xl mb-8"
                />
            )}

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-4">
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

            {/* Author + Date */}
            <div className="flex justify-between items-center text-gray-400 text-sm mb-8">
                <span>✍️ {blog.author?.username}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString("en-IN")}</span>
            </div>

            {/* Content */}
            <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Delete Button - only author dekhe */}
           {(user?.id === blog.author?._id || user?.role === "admin") && (
                <button
                    onClick={handleDelete}
                    className="mt-10 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                    Delete Blog 🗑️
                </button>
            )}
        </div>
    );
}

export default BlogDetail;
