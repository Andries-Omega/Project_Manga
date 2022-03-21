import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useForm } from '@felte/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import {
  setEmailValidity,
  setPasswordValidity,
  setUsernameValidity,
  SingUpData,
} from './Auth_Store/auth_store';
import {
  authenticateEmail,
  authenticatePassword,
  authenticateUsername,
} from './AuthFunctions';
import { useMutation, useQuery } from 'react-query';
import { signUp } from './Auth_Network/Auth_Network';

export default function SignUpForm() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const usernameValid = useSelector(
    (state: RootState) => state.autheticationState.usernameValid
  );
  const emailValid = useSelector(
    (state: RootState) => state.autheticationState.emailValid
  );
  const passwordValid = useSelector(
    (state: RootState) => state.autheticationState.passwordValid
  );
  const { mutate: signUpUser } = useMutation(signUp);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const dispatch = useDispatch();
  const { form } = useForm({
    onSubmit: (values) => {
      signUpUser(values);
    },
  });
  const validateUsername = (userName: string) => {
    dispatch(setUsernameValidity(authenticateUsername(userName)));
  };
  const validateEmail = (email: string) => {
    dispatch(setEmailValidity(authenticateEmail(email)));
  };
  const validatePassword = (password: string) => {
    dispatch(setPasswordValidity(authenticatePassword(password)));
  };
  useEffect(() => {
    if (
      emailValid.emailValid &&
      passwordValid.passwordValid &&
      usernameValid.usernameValid &&
      confirmedPassword
    ) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [
    confirmedPassword,
    passwordValid.passwordValid,
    usernameValid.usernameValid,
    emailValid.emailValid,
  ]);
  return (
    <>
      <form ref={form} className="grid gap-2 pl-6 pr-6 overflow-y-auto">
        <label htmlFor="username" className="text-base ">
          Username:
        </label>
        <input
          name="username"
          placeholder="Enter User Name"
          type="text"
          className={`${
            darkMode
              ? ' bg-slate-700 text-white focus:outline-none'
              : 'bg-white text-black'
          }  h-10 border-2 border-blue-100 pl-4 rounded-md mb-5`}
          onChange={(e) => validateUsername(e.target.value)}
          required
        />
        <p
          className={`${
            usernameValid.usernameValid ? 'hidden' : 'text-sm text-red-500'
          }`}
        >
          {usernameValid.usernameMessage}
        </p>
        <label htmlFor="email" className="text-base ">
          Email:
        </label>
        <input
          disabled={!usernameValid.usernameValid}
          name="email"
          placeholder="Enter Email"
          type="email"
          className={`${
            darkMode
              ? ' bg-slate-700 text-white focus:outline-none'
              : 'bg-white text-black'
          }  h-10 border-2 border-blue-100 pl-4 rounded-md mb-5`}
          onChange={(e) => validateEmail(e.target.value)}
          required
        />
        <p
          className={`${
            emailValid.emailValid ? 'hidden' : 'text-sm text-red-500'
          }`}
        >
          {emailValid.emailMessage}
        </p>
        <label htmlFor="password" className="text-base ">
          Password:
        </label>
        <input
          disabled={!emailValid.emailValid}
          id="password"
          name="password"
          placeholder="Enter Password"
          type="password"
          className={`${
            darkMode
              ? ' bg-slate-700 text-white focus:outline-none'
              : 'bg-white text-black'
          }  h-10 border-2 border-blue-100 pl-4 rounded-md mb-5`}
          onChange={(e) => validatePassword(e.target.value)}
          required
        />
        <p
          className={`${
            passwordValid.passwordValid ? 'hidden' : 'text-sm text-red-500'
          }`}
        >
          {passwordValid.passwordMessage}
        </p>
        <label htmlFor="confirm_password" className="text-base ">
          Confirm Password:
        </label>
        <input
          disabled={!passwordValid.passwordValid}
          placeholder="Confirm Above Password"
          type="password"
          className={`${
            darkMode
              ? ' bg-slate-700 text-white focus:outline-none'
              : 'bg-white text-black'
          }  h-10 border-2 border-blue-100 pl-4 rounded-md mb-5`}
          onChange={(e) => {
            if (e.target.value) {
              setConfirmedPassword(
                e.target.value ===
                  (document.getElementById('password') as HTMLInputElement)
                    ?.value
              );
            }
          }}
          required
        />
        <p
          className={`${confirmedPassword ? 'hidden' : 'text-sm text-red-500'}`}
        >
          Passwords Are not equal
        </p>
        <p>
          Alread have an Account?{'   '}
          <span>
            <Link
              to="/authentication/signin"
              className=" text-blue-500 hover:text-blue-700 duration-300"
            >
              Sign In
            </Link>
          </span>
        </p>
        <button
          disabled={!readyToSubmit}
          type="submit"
          className={`w-full text-white h-10 rounded-md mt-4  ${
            readyToSubmit
              ? 'bg-blue-500 hover:bg-blue-700 duration-300'
              : 'bg-blue-300'
          }`}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
