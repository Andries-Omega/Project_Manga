import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function SignUp() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );
  return (
    <button
      type="button"
      className={` bg-blue-500 h-10  w-20 rounded-md shadow-2xl
                                hover:bg-blue-700 text-${
                                  darkMode ? "black" : "white"
                                }`}
      onClick={() => {
        /* Empty */
      }}
    >
      Sign Up
    </button>
  );
}
