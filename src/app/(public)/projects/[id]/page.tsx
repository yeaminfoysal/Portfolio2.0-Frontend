import ProjectDetails from '@/components/modules/Projects/ProjectDetails';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

// 🔹 REQUIRED for static export
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`,
      {
        next: { revalidate: 3600 } // 1 hour cache
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch projects for static params');
      return [];
    }

    const data = await res.json();

    // Check if data exists
    if (!data?.data || !Array.isArray(data.data)) {
      console.error('Invalid data structure:', data);
      return [];
    }

    return data.data.map((project: { _id: string }) => ({
      id: project._id,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

const Page = async ({ params }: Props) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${params.id}`,
      {
        next: { revalidate: 3600 } // 1 hour cache
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch project ${params.id}:`, res.status);
      notFound();
    }

    const data = await res.json();

    // Check if project data exists
    if (!data?.data) {
      console.error('Project data not found:', data);
      notFound();
    }

    return <ProjectDetails project={data.data} />;
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
  }
};

export default Page;