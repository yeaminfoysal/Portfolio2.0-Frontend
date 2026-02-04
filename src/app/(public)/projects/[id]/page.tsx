import ProjectDetails from '@/components/modules/Projects/ProjectDetails';

type Props = {
  params: { id: string };
};

// 🔹 REQUIRED for output: export
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`
  );
  const data = await res.json();

  return data.data.map((project: { _id: string }) => ({
    id: project._id,
  }));
}

const Page = async ({ params }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${params.id}`
  );
  const data = await res.json();

  return <ProjectDetails project={data.data} />;
};

export default Page;
