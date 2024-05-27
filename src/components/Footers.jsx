import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";

export default function Footer(){
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem('access_token');
  const [authUser, setAuthUser] = useState([]);

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
        })
    } 
  });
    return(
        <footer className="bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center text-teal-600">
          <h1 className="text-4xl font-semibold dark:text-gray-300 text-shadow-blue hover:text-shadow-red rounded-md px-3 py-2 text-white ">
               Inventaris APP
              </h1>
          </div>
      
          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Temukan Cara Paling Efektif untuk Mengatur dan Memantau Inventaris Bisnis Anda 
          </p>
      
          {
                isLogin ? (
                    isLogin ? (authUser['role'] === 'admin') ? (
                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                  <Link to="/stuff">
                  <li>
              <a className="text-white transition hover:text-gray-700/75" href="#"> Stuff </a>
                 </li>
                  </Link>
                

                  <Link to="/inbound">
                  <li>
              <a className="text-white transition hover:text-gray-700/75" href="#"> Inbound </a>
                 </li>
                  </Link>

                  <Link to="/user">
                  <li>
              <a className="text-white transition hover:text-gray-700/75" href="#"> Lending </a>
                 </li>
                  </Link>
                
                  <Link to="/user">
                  <li>
              <a className="text-white transition hover:text-gray-700/75" href="#"> User </a>
                 </li>
                  </Link>
                
            </ul>
                ) :(
                  <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                  <Link to="/lending">

                  <li>
              <a className="text-white transition hover:text-gray-700/75" href="#"> Lending </a>
                 </li>
                  </Link>
            
            </ul>
            ) : '') : ''
            }
          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
  <a
    href="https://wa.me/6285715383055"
    rel="noreferrer"
    target="_blank"
    className="text-white transition hover:text-gray-700/75"
  >
    <span className="sr-only">WhatsApp</span>
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.473-.148-.674.15-.198.297-.773.967-.947 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.461-2.39-1.475-.883-.787-1.48-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.148-.173.198-.297.298-.495.099-.198.05-.372-.025-.52-.074-.149-.674-1.623-.922-2.219-.244-.587-.495-.508-.674-.508-.173 0-.372-.025-.572-.025-.198 0-.52.074-.793.372s-1.04 1.02-1.04 2.493 1.065 2.878 1.214 3.074c.148.198 2.093 3.197 5.07 4.484.708.306 1.26.489 1.69.624.711.226 1.356.194 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.61h-.002C7.548 19.972 4.5 16.424 4.5 12.042c0-4.383 3.548-7.93 7.932-7.93 4.385 0 7.933 3.547 7.933 7.93 0 4.383-3.548 7.93-7.931 7.93M12.432 0C5.579 0 0 5.58 0 12.432c0 2.186.574 4.332 1.662 6.208L0 24l5.458-1.43c1.78 1.068 3.806 1.633 5.915 1.63 6.852 0 12.432-5.579 12.432-12.43C24.29 5.58 18.71 0 12.432 0"
      />
    </svg>
  </a>
</li>

      
            <li>
              <a
                href="https://www.instagram.com/orangejahad/"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-700/75"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
      
            <li>
  <a
    href="https://www.linkedin.com/in/nakhalan-atqiya-arifin-putra-4b5b082a3/"
    rel="noreferrer"
    target="_blank"
    className="text-white transition hover:text-gray-700/75 "
  >
    <span className="sr-only">LinkedIn</span>
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19.75h-3v-10.5h3v10.5zm-1.5-12c-1.03 0-1.75-.81-1.75-1.75s.72-1.75 1.75-1.75 1.75.81 1.75 1.75-.72 1.75-1.75 1.75zm14.25 12h-3v-5.25c0-1.26-.47-2.13-1.66-2.13-.91 0-1.45.62-1.69 1.21-.09.22-.11.53-.11.84v5.33h-3v-10.5h3v1.43c.4-.62 1.14-1.5 2.78-1.5 2.03 0 3.56 1.33 3.56 4.19v6.38z"
      />
    </svg>
  </a>
</li>

            <li>
              <a
                href="https://github.com/NakhalanAtqiyaAP"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-gray-700/75"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
      
          </ul>
          <p className="text-xs text-gray-500 justify-center flex mt-4">&copy; 2024. Nakhalan Atqiya Arifin Putra</p>
          
        </div>
        
        

        
      </footer>
    )
}