/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { motion } from "framer-motion";
import { FaEye, FaUserAlt } from "react-icons/fa";

const BlogCard = ({ blog, index }: { blog: any, index: number }) => {
  return (
      <motion.div
        key={blog.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-background animated-border border z-10 relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 "
      >
        {/* Thumbnail */}
        <div className="relative h-56 w-full p-1">
          <motion.img
            src={blog.thumbnail}
            alt={blog.title}
            className="rounded-lg h-full w-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 main-bg text-white text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Blog Content */}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex items-center gap-2">
              <FaUserAlt className="main-txt" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="main-txt" />
              <span>{blog.views}</span>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

export default BlogCard;