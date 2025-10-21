"use client";
import { motion } from "framer-motion";
import data from "@/data/blogs.json";
import BlogCard from "../Blogs/BlogCard";

// ✅ Define blog type
interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  category: string;
  tags: string[];
  views: number;
  description: string;
  content: string;
}

const BlogSection: React.FC = () => {
  const blogs: Blog[] = data;

  return (
    <section className="py-20 transition-colors duration-500 relative">

        <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-[55px] font-bold text-center mb-10 "
        >
          Latest Teaching Blogs
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              index={index}
              blog={blog}
            />
          ))}
        </div>
    </section>
  );
};

export default BlogSection;
