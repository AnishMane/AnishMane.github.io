import { motion } from 'framer-motion';

import EmptyState from '@/common/components/elements/EmptyState';

import ProjectCard from './ProjectCard';

import { hardcodedProjects } from '@/common/data/projectsData';

const Projects = () => {
  const filteredProjects = hardcodedProjects.filter(
    (project) => project?.is_show,
  );

  if (filteredProjects.length === 0) {
    return <EmptyState message='No Data' />;
  }

  return (
    <div className='grid gap-5 px-1 pt-2 sm:grid-cols-2'>
      {filteredProjects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
