import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
// Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { setAuthUser, setToken } from '../redux/authSlice';
import './GoogleLogin.css'

const responseGoogle = async (authResult, dispatch, navigate) => {
  try {
    if (authResult.code) {
      const response = await axios.post('http://localhost:8000/api/google-login/', {
        code: authResult.code,
      });

      const { access_token, user_info } = response.data;

      // Dispatch the action to store user info in Redux store
      dispatch(setAuthUser(user_info))
      console.log("user info dispatched")
      dispatch(setToken(access_token))

      // Optionally, redirect to the dashboard
      navigate('/dashboard');

      console.log('Login Success: ', response.data);
    }
  } catch (error) {
    console.error('Error during login: ', error);
  }
};

function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (authResult) => responseGoogle(authResult, dispatch, navigate),
    onError: (error) => console.error('Login Failed:', error),
    flow: 'auth-code',
  });

  return (
    <>
    
    <div className='btn'>
    <h1>Login with Google Account</h1><br />
      <button onClick={() => googleLogin()}>Login with Google</button>
    </div>
    </>
    
  );
}

export default GoogleLogin;


