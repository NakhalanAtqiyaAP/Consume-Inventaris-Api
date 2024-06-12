import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [authUser, setAuthUser] = useState([]);
  
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/profile', {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
        .then(res => {
          setIsLogin(true);
          setAuthUser(res.data.data);
          if (location.pathname === '/login') {
            navigate('/profile');
          }
        })
        .catch(err => {
          setIsLogin(false);
          if (err.response.status === 401 && location.pathname !== '/' && location.pathname !== '/login') {
            navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
          }
        });
    } 
  }, [navigate, location.pathname, token]);

  const handleLogout = (event) => {
    event.preventDefault();
    axios.get('http://localhost:8000/logout', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then(res => {
        localStorage.removeItem('access_token');
        Swal.fire({
          icon: 'success',
          title: 'Berhasil logout',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/login');
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Logout gagal',
          text: 'Terjadi kesalahan saat logout. Silakan coba lagi.',
        });
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="block h-6 w-6" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="block h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-2xl font-semibold dark:text-gray-300 text-shadow-blue hover:text-shadow-red rounded-md px-3 py-2 text-white ">
                <Link to="/">Inventaris APP</Link>
              </h1>
            </div>
            {
                isLogin ? (
                    isLogin ? (authUser['role'] === 'admin') ? (
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 mt-1">
                <Link to="/dashboard" className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
                <Link to="/stuff" className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Stuff</Link>
                <Link to="/inbound" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Inbound</Link>
                <Link to="/lending" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Lending</Link>
                <Link to="/user" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">User</Link>
                <Link to="/service" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Service</Link>
                </div>
              </div> 
                ) :(
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 mt-1">
                <Link to="/lending" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Lending</Link>
                <Link to="/dashboard" className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
                </div>
              </div> 
            ) : '') : ''
            }
            
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLogin ? (
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-400 hover:text-white" />
              </Link>
            ) : null}
            <div className="ml-3 relative">
              {isLogin ? (
                <button type="button" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link to="/" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</Link>
            <Link to="/team" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</Link>
            <Link to="/projects" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</Link>
            <Link to="/calendar" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</Link>
            {isLogin ? (
                
              <button type="button" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center w-full">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center block w-full">
                Login
              </Link>
              
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
