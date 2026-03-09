"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function InstagramPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/instagram/all"
                );

                console.log('ress', res)

                setData(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
                Loading Instagram Data...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* ================= PROFILE HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 flex items-center justify-center text-3xl font-bold">
                            {data?.profile?.username?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold">
                                @{data?.profile?.username}
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {data?.profile?.account_type}
                            </p>

                            <div className="flex gap-6 mt-3 text-sm">
                                <p>
                                    <span className="font-semibold">
                                        {data?.profile?.media_count}
                                    </span>{" "}
                                    posts
                                </p>
                                <p>
                                    <span className="font-semibold">--</span> followers
                                </p>
                                <p>
                                    <span className="font-semibold">--</span> following
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ================= POSTS GRID ================= */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.media?.data?.map((item) => (
                        <motion.a
                            key={item.id}
                            href={item.permalink}
                            target="_blank"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.04 }}
                            className="relative rounded-2xl overflow-hidden bg-gray-800 group"
                        >
                            {/* IMAGE POSTS */}
                            {(item.media_type === "IMAGE" ||
                                item.media_type === "CAROUSEL_ALBUM") && (
                                    <img
                                        src={item.media_url}
                                        alt="post"
                                        className="w-full h-64 object-cover"
                                    />
                                )}

                            {/* VIDEO / REEL POSTS */}
                            {item.media_type === "VIDEO" && (
                                <video
                                    src={item.media_url}
                                    className="w-full h-64 object-cover"
                                    muted
                                    loop
                                    playsInline
                                />
                            )}

                            {/* REEL ICON */}
                            {item.media_type === "VIDEO" && (
                                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                                    Reel
                                </div>
                            )}

                            {/* HOVER OVERLAY */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                                <p className="text-xs text-gray-300 mb-1">
                                    @{data?.profile?.username}
                                </p>
                                <p className="text-sm text-gray-200 line-clamp-2">
                                    {item.caption || "Instagram Post"}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}