import React from 'react';
import { useForm } from '@felte/react';
import { useMutation } from 'react-query';
import { signIn } from './Auth_Network/Auth_Network';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { authenticateUsername } from './AuthFunctions';
import { setUsernameValidity } from './Auth_Store/auth_store';
import { Link } from 'react-router-dom';
import { NetworkStatus } from '../Model/Globase_Types';
export default function SignInForm() {
  const { form } = useForm({
    onSubmit: (values) => {
      // i am not checking if the password is given on the form, but i can not submit a blank to the api
      if (values.password) {
        signInUser(values);
      }
    },
  });
  const { mutate: signInUser, status: signinStatus } = useMutation(signIn);
  const dispatch = useDispatch();
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const validateUsername = (userName: string) => {
    dispatch(setUsernameValidity(authenticateUsername(userName, 'signin')));
  };
  const usernameValid = useSelector(
    (state: RootState) => state.autheticationState.usernameValid
  );
  const passwordValid = useSelector(
    (state: RootState) => state.autheticationState.passwordValid
  );
  return (
    <>
      <form
        ref={form}
        className="grid gap-2 pl-6 pr-6 overflow-y-auto duration-500 ease-in"
      >
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
        <label htmlFor="password" className="text-base ">
          Password:
        </label>
        <input
          disabled={!usernameValid.usernameValid}
          name="password"
          placeholder="Enter Password"
          type="password"
          className={`${
            darkMode
              ? ' bg-slate-700 text-white focus:outline-none'
              : 'bg-white text-black'
          }  h-10 border-2 border-blue-100 pl-4 rounded-md mb-5`}
          required
        />
        <p
          className={`${
            passwordValid.passwordValid ? 'hidden' : 'text-sm text-red-500'
          }`}
        ></p>
        <p>
          Don't have an Account? {'   '}
          <span>
            <Link
              to="/authentication/signup"
              className=" text-blue-500 hover:text-blue-700 duration-300"
            >
              Sign Up
            </Link>
          </span>
        </p>
        <button
          disabled={!usernameValid.usernameValid}
          type="submit"
          className={`w-full text-white h-10 rounded-md mt-4  ${
            signinStatus === NetworkStatus.PENDING ? 'animate-pulse' : ''
          } ${
            usernameValid.usernameValid
              ? 'bg-blue-500 hover:bg-blue-700 duration-300'
              : 'bg-blue-300'
          }`}
        >
          Sign In
        </button>
        <p
          className={`${
            signinStatus !== 'idle' ? 'text-sm text-red-400' : 'hidden'
          }`}
        >
          Unable to sign in, actually this form does not work. Please visit:{' '}
          <span>
            <a
              href="https://mangadex.org/login"
              target="_blank"
              className=" animate-pulse text-blue-500"
            >
              mangadex
            </a>
          </span>{' '}
          To login to your account
        </p>
      </form>
    </>
  );
}
