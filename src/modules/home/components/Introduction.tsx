const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hi, I&apos;m Anish</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Based in Maharashtra, India <span className='ml-1'></span>
            </li>
            <li>3rd Year student</li>
          </ul>
        </div>
      </div>
      <blockquote className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose' style={{ fontFamily: 'Georgia, serif' }}>
    "There are known knowns, and there are known unknowns, but there are also unknown unknowns, things we don't know we don't know."
    <footer className="mt-4 text-neutral-600 dark:text-neutral-400">– Donald Rumsfeld</footer>
</blockquote>



    </section>
  );
};

export default Introduction;
