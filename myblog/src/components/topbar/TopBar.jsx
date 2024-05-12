

// export default function Topbar() {
//   const { user ,dispatch } = useContext(Context);
//   const PF = "http://localhost:5000/images/";
//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//   };
//   return (
//     <div className="top">
//       <div className="topLeft">
//         <i className="topIcon fab fa-facebook-square"></i>
//         <i className="topIcon fab fa-instagram-square"></i>
//         <i className="topIcon fab fa-pinterest-square"></i>
//         <i className="topIcon fab fa-twitter-square"></i>
//       </div>
//       <div className="topCenter">
//         <ul className="topList">
//           <li className="topListItem">
//             <Link className="link" to="/">
//               HOME
//             </Link>
//           </li>
//           <li className="topListItem">ABOUT</li>
//           <li className="topListItem">CONTACT</li>
//           <li className="topListItem">
//             <Link className="link" to="/write">
//               WRITE
//             </Link>
//           </li>
//          <li className="topListItem" onClick={handleLogout}>
//             {user && "LOGOUT"}
//           </li>
//         </ul>
//       </div>
//       <div className="topRight">
//         {user ? (
//           <Link className="link" to="/settings">
//             <img
//               className="topImg"
//               src={PF+user.profilePic}
//               alt=""
//             />
//           </Link>
//         ) : (
//           <ul className="topList">
//             <li className="topListItem">
//               <Link className="link" to="/login">
//                 LOGIN
//               </Link>
//             </li>
//             <li className="topListItem">
//               <Link className="link" to="/register">
//                 REGISTER
//               </Link>
//             </li>
//           </ul>
//         )}
//         <i className="topSearchIcon fas fa-search"></i>
//       </div>
//     </div>
//   );
// }
// src/components/Navbar.js
import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";



const Topbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
     const { user ,dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
  localStorage.removeItem("jwt");
  dispatch({ type: "LOGOUT" });
};
  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Navigation links */}
                <Link
                  to="/"
                   className="text-gray-500 text-md hover:text-teal-400 rounded-md px-3 py-2  font-medium"
                >
                  Home
                </Link>
                <Link
                   to="#"
                  className="text-gray-500 text-md hover:text-teal-400 rounded-md px-3 py-2  font-medium"
                >
                 About
                </Link>
                <Link
                  to="#"
                  className="text-gray-500 text-md hover:text-teal-400 rounded-md px-3 py-2  font-medium"
                >
                  chat
                </Link>
                <Link
                  to="#"
                  className="text-gray-500 text-md hover:text-teal-400 rounded-md px-3 py-2  font-medium"
                >
                  Hire me
                </Link>
                  <Link className="text-gray-500 text-md hover:text-teal-400 rounded-md px-3 py-2  font-medium" to="/write">
               Write
            </Link>
              </div>
            </div>
          </div>

          {/* Right-side icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            {/* Profile button with dropdown */}
            <div className="relative ml-3">
             {user ? (<button
                type="button"
                className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-haspopup="true"
                aria-expanded={isProfileDropdownOpen}
                onClick={toggleProfileDropdown}
              >
                <span className="sr-only">Open user menu</span>
                
                <img
                  className="h-8 w-8 rounded-full"
                  src={PF+user.profilePic}
                  
                  alt=""
                />
              </button>) :(
          <ul className="topList hidden md:flex">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        ) } 

              {/* Profile dropdown */}
              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <Link
                to={`/?user=${user && user.uername}`}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                   my posts
                  </Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700" to="/write">
               WRITE
            </Link>
                            <li className="block px-4 py-2 text-sm cursor-pointer text-gray-700"  onClick={handleLogout}>
           <span onClick={toggleProfileDropdown}> {user && "LOGOUT"}</span> 
           </li>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
             Home
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              About
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              contact
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              projects
            </Link>
               <Link  className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" to="/write">
               Write
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
