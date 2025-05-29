import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaSpotify } from "react-icons/fa";

const Navbar = () => {
  const { tokenData, profile } = useAuth();

  return (
    <div className='w-full h-[20%] flex justify-between items-center px-8'>
      <div className="flex items-center">
        <FaSpotify size={32} className="text-[#3fc062] mr-3" />
        <span className="font-bold text-2xl">Cruze</span>
      </div>
      
      {/* <div className="flex items-center space-x-6">
        <Link to="/" className="font-medium">
          Home
        </Link>
        <a href="#" className="font-medium">
          About
        </a>
      </div> */}
    </div>
  );
};

export default Navbar;