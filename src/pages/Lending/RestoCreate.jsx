import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RestorationCreate() {
    const [forms, setForms] = useState({ date_time: '', total_good_stuff: '', total_defect_stuff:'', lending_id:'', user_id:'' });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        } 
    });

    const handleCreateRestoration = (event) => {
        event.preventDefault();

        // if (!forms.total_defec_stuff) {
        //     forms.total_defec_stuff = 0;
        // }

        console.log('Form data: ', forms);

        instance.post(`restoration/${forms.lending_id}`, forms)
            .then(res => {
                navigate('/restoration');
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.data.message
                });
            })
            .catch(err => {
                setError(err.response.data);
                const errorData = err.response.data;
                console.log(errorData);

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData.message
                });
            });
    };

    return (
        <Case>
            <div className="block m-auto  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue mb-10">Tambah Restoration</h5>
                    </div>
                    <form className="max-w-sm mx-auto" onSubmit={handleCreateRestoration}>
                        <div className="mb-5">
                            <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal dan Waktu</label>
                            <input type="date" id="date_time" placeholder="Waktu"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, date_time: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="total_good_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Barang Baik</label>
                            <input type="number" id="total_good_stuff" placeholder="Total Barang Baik"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, total_good_stuff: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="total_defec_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Barang Rusak</label>
                            <input type="number" id="total_defec_stuff" placeholder="Total Barang Rusak"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, total_defect_stuff: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="lending_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Peminjaman</label>
                            <input type="text" id="lending_id" placeholder="ID Peminjaman"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, lending_id: e.target.value })} />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                    <Link to='/restoration'>
                    <button type="button" className=" w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                     <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                     <span>Go back</span>
                        </button>
                    </Link>
                </div>
            </div>
        </Case>
    );
}
