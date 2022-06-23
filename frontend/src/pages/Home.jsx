import { Link } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className='my-16'>
        <h1 className='lg:text-5xl text-2xl font-black mb-8 text-center tracking-wide'>What do you need help with?</h1>
        <p className='lg:text-3xl text-xl text-gray-600/50 text-center tracking-wide'>Please choose from an option below</p>
      </section>

      <Link to='/new-ticket' className='flex items-center justify-center border-4 mb-6 lg:py-3 py-2 rounded-xl bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300'>
        <FaQuestionCircle className='mr-2'/>
        <p className='lg:text-2xl text-xl'>
          Create New Ticket
        </p>
      </Link>

      <Link to='/tickets' className='flex items-center justify-center border-4 lg:py-3 py-2 rounded-xl bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300'>
        <FaTicketAlt className='mr-2'/> 
        <p className='lg:text-2xl text-xl'>
          View My Tickets
        </p>
      </Link>
    </>
  );
}

export default Home;