import { Blog } from "@/type";
import BlogCard from "@/components/modules/Blogs/BlogCard";

const BlogSection = async () => {

  const res = await fetch("http://localhost:4000/api/blogs");
  const data = await res.json();
  const blogs: Blog[] = data?.data || [];

  return (
    <section className="py-20 relative">

      <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

      <h2
        className="text-3xl md:text-[55px] font-bold text-center mb-10 "
      >
        Latest Teaching Blogs
      </h2>

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
