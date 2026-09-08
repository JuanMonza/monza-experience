import { notFound } from "next/navigation";

import ProjectCaseStudyPage from "@/components/projects/ProjectCaseStudyPage";
import { projects } from "@/data/projects";
import { getProjectCaseStudy } from "@/data/projectCaseStudies";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.id === slug,
  );

  const caseStudy =
    getProjectCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <ProjectCaseStudyPage
      project={project}
      caseStudy={caseStudy}
    />
  );
}