import { FC } from 'react';
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/logout');
  }
  const tokenExists = localStorage.getItem('token');
  // console.log(tokenExists);
  return (
    <nav className="bg-white shadow-md text-black absolute w-full">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Movie Bros</div>

        <div>
            {tokenExists &&
                <button
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    onClick={handleClick}
                >
                    Logout
                </button>
            }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;