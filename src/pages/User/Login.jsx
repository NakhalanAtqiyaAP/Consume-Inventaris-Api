import React, {useState} from "react";
import Case from '../../components/Case'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Quotes from '../../components/Quotes'
import Swal from "sweetalert2";

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = new URLSearchParams(location.search).get('message');

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/login', values)
        .then(res => {
            localStorage.setItem('access_token', res.data.data.access_token);
            console.log(res.data)
            navigate('/profile');
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Login!',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(err => {
            setError(err.response.data);
            console.log(err)
        })
    }

    return (
        <Case>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg">
                <div className="mx-auto max-w-lg bg-white pt-10 border-2 border-indigo-500  shadow-lg shadow-indigo-500/100">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>
                <Quotes/>
{/* Untuk mengecek apakah halaman diakses dengan mengirim params pada URL */}
{errorMessage && (
                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                    <strong className="block font-medium text-red-800">Failed</strong>
                    <p className="mt-2 text-sm text-red-700">
                        Anda Belum Login!
                    </p>
                </div>
            )}
    {/* Untuk mengecek apakaha state error memiliki data , jika  iya munculkan datanya secara looping */}
            {Object.keys(error).length > 0 && (
                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 ">
                    <strong className="block font-medium text-red-800">Failed</strong>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <ul>
                            {Object.entries(error).map(([key, value]) => (
                                <li key={key}>{key !== "status" ? value : ''}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

                    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleLogin}>
                        <p className="text-center text-lg font-medium">Sign in to your account</p>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="name@company.com"
                                    required=""
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="••••••••"
                                    required=""
                                    onChange={e => setValues({ ...values, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                    </form>
                </div>
            </div>
        </Case>
    );
}
