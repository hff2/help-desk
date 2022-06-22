import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.tickets
    );

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
        toast.error(message);
        }

        if (isSuccess) {
        dispatch(reset());
        navigate('/tickets');
        }

        dispatch(reset());
    }, [dispatch, isError, isSuccess, navigate, message]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        dispatch(createTicket({ product, description }));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
        <BackButton url='/' />
        <section className='my-16'>
            <h1 className='lg:text-4xl text-2xl font-black mb-6 flex items-center justify-center'>Create New Ticket</h1>
            <p className='lg:text-4xl text-2xl font-bold text-gray-600/50 text-center'>Please fill out the form below</p>
        </section>

        <section className='form'>
            <div className='form-group'>
            <label htmlFor='name'>Customer Name</label>
            <input type='text' className='form-control' value={name} disabled />
            </div>
            <div className='form-group'>
            <label htmlFor='email'>Customer Email</label>
            <input type='text' className='form-control' value={email} disabled />
            </div>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='product'>Product</label>
                <select
                name='product'
                id='product'
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                >
                <option value='Pixel 6 Pro'>Pixel 6 Pro</option>
                <option value='Samsung Galaxy S23'>Samsung Galaxy S23</option>
                <option value='iPhone'>iPhone</option>
                <option value='iPad'>iPad</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description of the issue</label>
                <textarea
                name='description'
                id='description'
                className='form-control'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className='form-group'>
                <button type='submit' className='border-4 lg:py-3 py-2 rounded-xl w-full text-lg bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300'>
                Submit
            </button>
            </div>
            </form>
        </section>
        </>
    );
}

export default NewTicket;