import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import { useAuth } from "../context/AuthContext.jsx";

function CreateBlog() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
        coverImage: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Title aur content zaroori hai!");
            return;
        }
        setLoading(true);
        try {
            await axios.post(
                "http://localhost:5000/api/blogs",
                {
                    ...formData,
                    tags: formData.tags.split(",").map((t) => t.trim()),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Blog published! 🎉");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl text-gray-500">
                    Blog likhne ke liye pehle{" "}
                    <a href="/login" className="text-indigo-600 hover:underline">
                        login karo
                    </a>
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Naya Blog Likho ✍️
            </h1>

            <div className="flex flex-col gap-5 bg-white p-8 rounded-xl shadow-md">
                <input
                    type="text"
                    name="title"
                    placeholder="Blog ka title..."
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <input
                    type="text"
                    name="coverImage"
                    placeholder="Cover image URL (optional)"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated): react, nodejs, javascript"
                    value={formData.tags}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {/* Markdown Editor */}
                <div data-color-mode="light">
                    <label className="text-gray-600 mb-2 block">Content</label>
                    <MDEditor
                        value={formData.content}
                        onChange={(value) => setFormData({ ...formData, content: value || "" })}
                        height={300}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50"
                >
                    {loading ? "Publishing..." : "Publish Blog 🚀"}
                </button>
            </div>
        </div>
    );
}

export default CreateBlog;