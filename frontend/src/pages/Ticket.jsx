import { useState ,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket  } from '../features/tickets/ticketSlice';
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
const customStyles = {
    content: {
        width: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
};

Modal.setAppElement('#root');

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('');
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );

    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.notes
    )

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    // eslint-disable-next-line
    }, [isError, message, ticketId]);

    // Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };

    if (isLoading || notesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>;
    }

    // Create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }));
        closeModal();
    };

    // Open/close modal
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className='ticket-page'>
        <header className='ticket-header space-y-3'>
            <BackButton url='/tickets' />
            <h2 className='text-lg'>
                Ticket ID：{ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3 className='text-lg'>
                Date Submitted：{new Date(ticket.createdAt).toLocaleString('zh-tw')}
            </h3>
            <h3 className='text-lg'>Product：{ticket.product}</h3>
            <hr />
            <div className='ticket-desc'>
                <h3 className='font-bold'>Description of Issue：</h3>
                <p>{ticket.description}</p>
                <p>{ticket.state}</p>
            </div>
            <h2 className='text-lg'>Notes：</h2>
            <hr className='pb-3'/>
        </header>

        {ticket.status !== 'closed' && (
            <button onClick={openModal} className='flex items-center justify-center w-28 lg:w-36 border-2 py-2 rounded-xl bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300 my-5'>
                <FaPlus className='mr-2'/> Add Note
            </button>
        )}

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Add Note'
        >
            <div className='flex justify-between mb-4'>
                <h2 className='text-2xl'>Add Note</h2>
                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <form onSubmit={onNoteSubmit}>
            <div className='form-group'>
                <textarea
                name='noteText'
                id='noteText'
                className='form-control'
                placeholder='Note text'
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
            </div>
            <div className='form-group'>
                <button type='submit' className='border-4 lg:py-3 py-2 rounded-xl w-full text-lg bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300'>
                    Submit
                </button>
            </div>
            </form>
        </Modal>


        {notes.map(
            (note) => (
                <NoteItem key={note._id} note={note} />
            )
        )}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className='w-28 lg:w-36 border-2 py-2 rounded-xl bg-red-500 text-zinc-50 hover:bg-red-600 ease-in-out duration-300 my-5'>
                    Close Ticket
                </button>
            )}
        </div>
    );
}

export default Ticket;