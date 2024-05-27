import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LendingCreate() {
   const [forms, setForms] = useState({ stuff_id: '', name:'', date_time:'', total_stuff: '', notes:'', user_id:'' });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    const handleCreateLending = (event) => {
        event.preventDefault();

        // const formData = new FormData();
        // //.append mengirim data function forms melalui http -> masuk ke formData -> formData akan dikirim lewat instance.post ke backend
        // formData.append('stuff_id', forms.stuff_id);
        // formData.append('total', forms.total);
        // formData.append('date', forms.date);
        // formData.append('proff_file', forms.proff_file);


        console.log('Form data: ' ,forms)

        instance.post('lending', forms)
            .then(res => {
                navigate('/lending');
                Swal.fire({
                    icon: 'success',
                    title: 'Success! ',
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
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
                <div className="items-center m-5 pb-10 pt-10">
                    {/* {error.message && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <p>{error.message}</p>
                            </div>
                        </div>
                    )} */}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue mb-10 ">Tambah lending</h5>
                    </div>
                    <form className="max-w-sm mx-auto" onSubmit={handleCreateLending}>
                        <div className="mb-5">
                            <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stuff Id</label>
                            <input type="text" id="name" placeholder="Ketik id Stuff "
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, stuff_id: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input type="date" id="total" placeholder="Ketik Nama Barang"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, date_time: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                            <input type="text" id="name" placeholder="Ketik Nama Barang"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, name: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="total_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Stuff</label>
                            <input type="text" id="total" placeholder="Ketik Nama Barang"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, total_stuff: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                            {/* <input type="text" id="notes" placeholder="..."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, notes: e.target.value })} /> */}

                            <textarea id="notes" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="...." onChange={e => setForms({ ...forms, notes: e.target.value })}></textarea>
                        </div>

                        
                        
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                    <Link to='/lending'>
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
