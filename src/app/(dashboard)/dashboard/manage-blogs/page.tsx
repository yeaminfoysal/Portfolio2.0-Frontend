import { BlogsTable } from '@/components/modules/Blogs/BlogsTable';
import React from 'react'

export default async function ManageProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`);
  const data = await res.json();
  const blogs = data?.data || [];
  return (
    <div className='max-w-5xl mx-auto mt-10 shadow-xl border border-border/40'>
      <BlogsTable blogs={blogs} />
    </div>
  )
}
