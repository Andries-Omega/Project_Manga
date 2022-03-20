/* eslint-disable tailwindcss/no-custom-classname */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store';

export default function MobileSiteRouting() {
  const darkMode = useSelector(
    (state: RootState) => state.globalState.darkMode
  );

  const currentPage = useSelector(
    (state: RootState) => state.globalState.currentPage
  );

  return (
    <div
      className={`fixed bottom-0 inset-x-0 flex justify-around items-center ${
        darkMode ? 'bg-gray-800' : 'bg-slate-200'
      } rounded-t-xl h-12`}
    >
      <Link
        to="/"
        className={`${chooseNavClass(
          currentPage,
          '/',
          darkMode
        )} text-xl cursor-pointer`}
      >
        <span>
          <i className="fa-solid fa-house " />
        </span>
      </Link>

      <Link
        to="#"
        className={`${chooseNavClass(
          currentPage,
          'create_manga',
          darkMode
        )} text-xl cursor-pointer `}
      >
        <span>
          <i className="fa-solid fa-gears" />
        </span>
      </Link>

      <Link
        to="#"
        className={`${chooseNavClass(
          currentPage,
          'liked_mangas',
          darkMode
        )} text-xl cursor-pointer  `}
      >
        <span>
          <i className="fa-solid fa-heart" />
        </span>
      </Link>

      <Link
        to="#"
        className={`${chooseNavClass(
          currentPage,
          'read_manga',
          darkMode
        )} text-xl cursor-pointer `}
      >
        <span>
          <i className="fa-solid fa-book-open" />
        </span>
      </Link>
    </div>
  );
}

function chooseNavClass(
  currentPage: string,
  checkCurrent: string,
  darkMode: boolean
): string {
  let theClass = '';
  const isCurrentPage = currentPage === checkCurrent ? 'text-blue-500' : '';
  if (!isCurrentPage) {
    theClass = darkMode
      ? 'text-white hover:text-blue-500'
      : 'text-black hover:text-blue-500';
  } else {
    theClass = isCurrentPage;
  }

  return theClass;
}
