import ProjectDetails from '@/components/modules/Projects/ProjectDetails';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:4000/api/projects/${params.id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return <ProjectDetails project={data.data} />
}

export default page