import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket  } from '../features/tickets/ticketSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );

    console.log(ticket);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
    }, [isError, message, ticketId]);

    // Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>;
    }

    return (
        <div className='ticket-page'>
        <header className='ticket-header'>
            <BackButton url='/tickets' />
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>
                Date Submitted: {new Date(ticket.createdAt).toLocaleString('zh-tw')}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className='ticket-desc'>
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
                <p>{ticket.state}</p>
            </div>
        </header>
            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className='w-28 lg:w-36 border-2 py-2 rounded-xl bg-red-500 text-zinc-50 hover:bg-red-600 ease-in-out duration-300 my-5'>
                    Close Ticket
                </button>
            )}
        </div>
    );
}

export default Ticket;