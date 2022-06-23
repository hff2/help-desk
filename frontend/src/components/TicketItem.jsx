import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
    return (
        <div className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString('zh-tw')}</div>
            <div>{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>{ticket.status}</div>
            <Link to={`/ticket/${ticket._id}`} className='w-14 lg:w-28 border-2 py-1 rounded-xl bg-slate-400 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300'>
                View
            </Link>
        </div>
    );
}

export default TicketItem;