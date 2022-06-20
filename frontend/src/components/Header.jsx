import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispath(logout());
        dispath(reset());
        navigate('/');
    };
    return (
        <header className='flex justify-between border-solid pb-2 border-b-2'>
            <div className='text-2xl font-bold logo'>
                <Link to='/'>Help Desk</Link>
            </div>
            <ul className='flex items-center'>
            {user ? (
                <li>
                    <button className='flex items-center' onClick={onLogout}>
                    <FaSignInAlt className='mr-1'/>
                        Logout
                    </button>
                </li>
                ) : (
                <>
                    <li className='mr-4'>
                        <Link to='/login' className='flex items-center'>
                            <FaSignInAlt className='mr-1'/> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' className='flex items-center'>
                            <FaUser className='mr-1'/> Register
                        </Link>
                    </li>
                </>
            )}
            </ul>
        </header>
    );
}

export default Header;