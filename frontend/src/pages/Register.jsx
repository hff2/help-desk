import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('密碼輸入錯誤');
    }
    else{
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData))
    }
  };

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      <section className='my-16'>
        <h1 className='lg:text-4xl text-2xl font-black mb-6 flex items-center justify-center'>
          <FaUser className='mr-2'/> Register
        </h1>
        <p className='lg:text-4xl text-2xl font-bold text-gray-600/50 text-center'>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
              required
            />
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

export default Register;