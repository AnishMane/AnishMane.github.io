import Breakline from '@/common/components/elements/Breakline';

import BookACall from './BookACall';
import ContactForm from './ContactForm';
import SocialMediaList from './SocialMediaList';

const Contact = () => {
  return (
    <section className='space-y-6'>
      <SocialMediaList />
      <Breakline />
      <BookACall />
    </section>
  );
};

export default Contact;
