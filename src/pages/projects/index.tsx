import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { ProjectsProps } from '@/common/types/projects';
import Projects from '@/modules/projects';
import { hardcodedProjects } from '@/common/data/projectsData';

const PAGE_TITLE = 'Projects';
const PAGE_DESCRIPTION =
  'Several projects that I have worked on, both private and open source.';


interface ProjectsPageProps {
  projects: ProjectsProps['projects'];
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => setVisibleProjects((prev) => prev + 2);
  const hasMore = visibleProjects < projects.length;

  return (
    <>
      <NextSeo title={`${PAGE_TITLE}`} description={PAGE_DESCRIPTION} />
      <Container data-aos="fade-up">
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Projects
          projects={projects.slice(0, visibleProjects)}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </Container>
    </>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async () => {
  // Use hardcoded data for static props
  const response = hardcodedProjects
    .filter((project) => project.is_show)
    .sort((a, b) => {
      // Sort by `is_featured` first, then by `updated_at`
      if (a.is_featured === b.is_featured) {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return b.is_featured ? 1 : -1;
    });

  return {
    props: {
      projects: JSON.parse(JSON.stringify(response)), // Serialize for Next.js
    },
    revalidate: 1, // Rebuild static props every second
  };
};
