import { MdSpaceDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex ms-2 md:me-24">
              <MdSpaceDashboard className="h-8 me-3 text-xl text-violet-500" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                BookMySlot
              </span>
            </a>
          </div>

          {/* <ul className="hidden md:flex font-semibold space-x-16 items-center text-gray-500 dark:text-gray-300">
            <li>
              <a
                href="#"
                className="hover:text-violet-500 dark:hover:text-violet-400"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-violet-500 dark:hover:text-violet-400"
              >
                Appointments
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-violet-500 dark:hover:text-violet-400"
              >
                Booking
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-violet-500 dark:hover:text-violet-400"
              >
                Booking Check
              </a>
            </li>
          </ul> */}

          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 flex items-center gap-2 border border-violet-500 text-violet-500 rounded-lg hover:bg-violet-500 hover:text-white transition"
              onClick={handleLogout}
            >
              <IoIosLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
