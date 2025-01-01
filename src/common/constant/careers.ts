import { CareerProps } from '../types/careers';

export const CAREERS: CareerProps[] = [
  {
    position: 'Full Stack Engineer Intern',
    company: 'Fanztar',
    company_legal_name: 'Fanztar',
    logo: '/images/careers/fanztar.jpeg',
    location: 'Gurugram, Haryana, India',
    location_type: 'Remote',
    type: 'Internship',
    start_date: '2024-6',
    end_date: '2024-12',
    industry: 'nft',
    link: 'https://fanztar.com/',
    responsibilities: [
      'Developed and maintained web applications using Quasar Framework (Vue.js), Tailwind CSS, and Flask, enhancing user experiences for Fanztar’s engagement platform.',
      'Optimized MongoDB databases with MongoEngine and PyMongo, ensuring efficient data handling for over 10,000 daily user interactions.',
      'Collaborated with cross-functional teams to integrate backend APIs with frontend, enabling fans to own a share of creators’ income and access exclusive privileges.',
    ],
  },
  {
    position: 'Student Coordinater',
    company: 'IoT Club',
    company_legal_name: 'Internet Of Things',
    logo: '/images/careers/iot.jpeg',
    location: 'Bhopal, India',
    location_type: 'On-site',
    type: '',
    start_date: '2023-11',
    end_date: null,
    industry: 'wellness',
    link: 'https://www.linkedin.com/company/iot-club-vitb/posts/?feedView=all',
    responsibilities: [
      'Successfully organized a small-scale IoT event, fostering hands-on learning and collaboration within the club, providing members with a practical understanding of IoT concepts and applications',
    ],
  },

];
