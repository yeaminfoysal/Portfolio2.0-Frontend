import { ProjectTable } from '@/components/modules/Projects/ProjectsTable';
import React from 'react'

export default async function ManageProjects() {
  const res = await fetch("http://localhost:4000/api/projects");
  const data = await res.json();
  const projects = data?.data || [];
  return (
    <div className='max-w-5xl mx-auto mt-10 shadow-xl border border-border/40'>
      <ProjectTable projects={projects}/>
    </div>
  )
}
