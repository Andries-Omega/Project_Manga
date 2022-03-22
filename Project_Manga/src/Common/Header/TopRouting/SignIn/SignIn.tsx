import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className=" w-20 h-10 text-black bg-slate-200 hover:bg-blue-200 rounded-md
                                shadow-2xl"
      onClick={() => {
        navigate(`/authentication/${'signin'}`);
      }}
    >
      Sign In
    </button>
  );
}
