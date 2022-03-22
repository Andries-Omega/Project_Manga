import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import RecaptchaForm from './RecaptchaForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function () {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    /**
     * This is just to show form validation, inorder to actually sign up to mangadex you need to solve a recaptcha, inorder to solve a recaptcha your app shouldn't be localhost.
     */
    <>
      <div className="flex justify-center items-center h-screen">
        <div
          className={`bg-slate-${
            darkMode ? '800 text-white ' : '50 text-black '
          } w-[350px] md:w-[600px] h-fit shadow-2xl rounded-xl grid grid-cols-2`}
        >
          <button
            type="button"
            className={`w-full h-fit pt-4 ${
              type === 'signin'
                ? 'border-b-2 border-blue-500 ease-in duration-300'
                : ''
            } `}
            onClick={() => {
              navigate(`/authentication/signin`);
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-full h-fit pt-4 ${
              type === 'signup'
                ? 'border-b-2 border-blue-500 ease-in duration-300'
                : ''
            }`}
            onClick={() => {
              navigate(`/authentication/signup`);
            }}
          >
            Sign Up
          </button>

          <div className=" col-span-2">
            {/* Sign In */}
            <div
              className={`${
                type === 'signin' ? 'ease-in duration-300 pt-5 pb-5' : 'hidden'
              }`}
            >
              <SignInForm />
            </div>

            {/* Sign Up */}
            <div
              className={`${
                type === 'signup' ? 'ease-in duration-300 pt-5 pb-5' : 'hidden'
              }`}
            >
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
