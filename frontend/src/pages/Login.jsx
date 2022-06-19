import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className='my-16'>
        <h1 className='lg:text-4xl text-2xl font-black mb-6 flex items-center justify-center'>
          <FaSignInAlt className='mr-2'/> Login
        </h1>
        <p className='lg:text-4xl text-2xl font-bold text-gray-600/50 text-center'>Please login to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <button type='submit' className='border-4 lg:py-3 py-2 rounded-xl w-full text-lg bg-slate-500 text-zinc-50 hover:bg-zinc-50 hover:text-slate-500 ease-in-out duration-300'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;