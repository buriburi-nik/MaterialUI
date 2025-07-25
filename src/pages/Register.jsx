import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateSignInForm,
  clearSignInForm,
  setLoading,
  setError,
  signInSuccess,
} from '../store/authSlice';
export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signInForm, isLoading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className='min-h-screen bg-white flex'>


    </div>
  )
}
