import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {

const [username, setUsername] = useState('');
const [email, setemail] = useState('');
const [password, setpassword] = useState('');

const navigate = useNavigate();

const handleRegister= async(e)=>{
  e.preventDefault();
  // API call to signup user
  try {
    const {data}=await axios.post('http://localhost:4001/user/signup',{
      username,
      email,
      password,
    },{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(data);
    alert(data.message||"SignUp successful");
    localStorage.setItem('jwt',data.token);
    navigate('/login');
    setUsername('');
    setemail('');
    setpassword('');
  } catch (error) {
    console.log(error.message);
    alert(error.response.data.message||'Error IN user Registration');
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
            value={email}
            onChange={(e)=>setemail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
