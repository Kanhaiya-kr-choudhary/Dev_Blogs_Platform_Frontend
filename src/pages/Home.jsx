import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard.jsx";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(res.data);
            } catch (error) {
                console.error("Error fetching blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    Dev Blogs 🚀
                </h1>
                <p className="text-gray-500 text-lg">
                    Developers ke liye, developers ke dwara
                </p>
            </div>

            {/* Blogs Grid */}
            {blogs.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                    <p className="text-2xl mb-2">Koi blog nahi mila 😕</p>
                    <p>Pehla blog likhne wale bano!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;