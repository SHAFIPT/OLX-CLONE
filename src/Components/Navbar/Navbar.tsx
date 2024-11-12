import './Navbar.css'
import Logo from '../../assets/symbol.png';
import addButton from '../../assets/addButton.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState ,useContext} from 'react';  
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../AuthContext';
import love from '../../assets/love.png'

const Navbar = () => {
  const { user, loginWithGoogle , logout} = useContext(AuthContext) || { user: null, loginWithGoogle: () => {} };
  const [toggleSerchDown, setToggleSerchDown] = useState(false);
  const [toggleLang, setToggleLang] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dorpDownOpen , setDropDownOpen] = useState(false)

  const navigate = useNavigate();

  const toggleDropdownSerch = () => {
    setToggleSerchDown(!toggleSerchDown);
  };

  const toggleDropdownLanguage = () => {
    setToggleLang(!toggleLang);
  };

  const handleAddButton = () => {
    if(user){
      navigate('/selling');
    }else{
     setShowLoginModal(true)
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      setShowLoginModal(false)
    } catch (error) {
      console.error("Login faild", error)
    }
  };

  const handleUserNameClick = () => {
    setDropDownOpen(!dorpDownOpen)
  }

  const handleLogoutButton = () => {
    if(logout){
      logout()
    }else{
      console.error("Logout function is not defied!")
    }
  }

  return (
    <div>
      <nav className="top-0 w-full bg-[#eff1f3] shadow-sm">
        <div className="w-full px-2 sm:px-4">
          <div className="flex items-center h-16 relative">
            {/* Logo */}
            <div onClick={handleClick} className="cursor-pointer">
              <img src={Logo} alt="Logo" className="h-7" />
            </div>

            {/* Search Section */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-1 ml-4 sm:ml-6">
              {/* City Search - Hidden on mobile */}
              <div className="hidden sm:block relative w-[320px]">
                <input
                  type="text"
                  placeholder="Search City"
                  className="w-full px-10 py-2 border-2 border-[#002f34] rounded focus:outline-none focus:border-[#002f34]"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-[#002f34] text-lg"
                />
                <FontAwesomeIcon
                  icon={toggleSerchDown ? faChevronUp : faChevronDown}
                  className="absolute right-3 w-[26px] top-1/2 -translate-y-1/2 text-[#002f34] cursor-pointer text-lg"
                  onClick={toggleDropdownSerch}
                />
              </div>

              {/* Main Search */}
              <div className="flex-1 relative max-w-4xl">
                <input
                  type="text"
                  placeholder="Find phone data"
                  className="w-full px-3 py-2 border-2 border-[#002f34] rounded focus:outline-none focus:border-[#002f34]"
                />
                <button
                  className="absolute right-0 top-0 h-full px-4 bg-[#002f34] text-white rounded-r flex items-center justify-center hover:bg-[#003f44]"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-lg" />
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4 mr-1 sm:mr-2">
              {/* Language Selector */}
              <div className="hidden sm:flex items-center gap-1 cursor-pointer">
                <span className="font-semibold text-sm">ENGLISH</span>
                <FontAwesomeIcon
                  icon={toggleLang ? faChevronUp : faChevronDown}
                  className=""
                  onClick={toggleDropdownLanguage}
                />
              </div>

              {/* Login Button */}
              {user ? (
                  <div className='flex items-center gap-2 cursor-pointer' onClick={handleUserNameClick}>
                    <span className="font-semibold text-sm cursor-pointer">
                     {user.displayName || 'User'}
                    </span>
                    <FontAwesomeIcon icon={dorpDownOpen ? faChevronUp : faChevronDown} className='text-lg text-[#002f34]'/>
                    {dorpDownOpen && (
                      <div className="absolute bg-white shadow-lg rounded mt-[103px] p-2 w-40">
                        <ul>
                          <li className='py-1 bg-white text-sm cursor-pointer hover:bg-gray-200 px-2'>Profile</li>
                          <li onClick={handleLogoutButton} className='py-1 bg-white text-sm cursor-pointer hover:bg-gray-200 px-2'>LogOut</li>
                        </ul>
                      </div>
                    )}
                  </div>
              ): (
                <button onClick={handleLoginClick} className="text-base underline hover:text-[#002f34] mx-1 sm:mx-2 font-semibold">
                Login
               </button> 
              )}
              

              {/* Sell Button */}
              <div className="hidden sm:block">
                <img
                  src={addButton}
                  alt="Add Button"
                  onClick={handleAddButton}
                  className="w-[100px] cursor-pointer shadow-2xl hover:shadow-xl transition-shadow duration-300 rounded-[4px]"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Google Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-[12px] shadow-lg h-[620px] w-[430px] flex flex-col items-center ">\
          <img src={love} alt="" className='w-28'/>
            <h2 className="text-[29px] p-14 font-semibold ">Login with Google</h2>
            <button
              onClick={handleGoogleLogin}
              className="bg-[#4285F4]  text-white  px-9 py-2 rounded shadow hover:bg-[#357ae8] mb-16 transition duration-200"
            >
              Login with Google
            </button>
            <button onClick={() => setShowLoginModal(false)} className="mt-2  border px-5 py-3 rounded-[8px] hover:bg-[#277c85] bg-[#002f34] text-white">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;