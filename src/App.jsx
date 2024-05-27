import  { useState, useEffect} from 'react'
// import React from 'react'
// import Title from './components/Title'
// import Card from './components/Card'
import Footers from './components/Footers'
import Main from './components/Main'
import Case from './components/Case'
import { Link } from "react-router-dom";
import axios from "axios";
import MainQuotes from './components/QuotesMain';
import Review from './components/Review';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

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
        })  
    } 
  }, [token]); 

  return (
    <Case>
      <section
        className="relative bg-[url(https://images.unsplash.com/photo-1491598601902-712af90cc6ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat min-h-screen"
      >
        <div
          className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:bg-gradient-to-r from-gray-900 k/95 to-white/25"
        ></div>

        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
        >
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
              Mari Mulai Pengalaman Efisien Dalam Mengelola
              <strong className="block font-extrabold text-indigo-400 text-shadow-blue">Inventaris Anda.</strong>
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl text-gray-300">
            Inventarisasi yang Mudah Dipahami: Solusi Modern untuk Efisiensi Bisnis
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              {
              !isLogin && (
                <Link to="/login">
                  <a href="#" className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto ">
                    Get Started
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <Main/>
      <MainQuotes/>
      <Review/>
      <Footers/>
    </Case>
  );
}
