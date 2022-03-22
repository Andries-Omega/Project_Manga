import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../store';

export default function SignUp() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={` bg-blue-500 h-10  w-20 rounded-md shadow-2xl
                                hover:bg-blue-700 text-white`}
      onClick={() => {
        navigate(`/authentication/${'signup'}`);
      }}
    >
      Sign Up
    </button>
  );
}
