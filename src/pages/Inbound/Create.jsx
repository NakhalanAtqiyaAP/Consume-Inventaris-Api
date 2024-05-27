import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function InboundCreate() {
    const [forms, setForms] = useState({ stuff_id: '', total: '', date: '', proff_file: null });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    const handleCreateInbound = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        //.append mengirim data function forms melalui http -> masuk ke formData -> formData akan dikirim lewat instance.post ke backend
        formData.append('stuff_id', forms.stuff_id);
        formData.append('total', forms.total);
        formData.append('date', forms.date);
        formData.append('proff_file', forms.proff_file);

        instance.post('inbound', formData)
        .then(res => {
            navigate('/inbound');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: res.data.message
            });
        })
        .catch(err => {
            setError(err.response.data);
            console.log(err.response);

            const errorData = err.response.data;
            console.log(errorData);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorData.message
            })  
            
        });
    };

    return (
        <Case>
            <div className="block m-auto  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {/* {error.message && (
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.message
                        }) 
                    )} */}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue mb-10">Tambah Inbound</h5>
                    </div>
                    <form className="max-w-sm mx-auto" onSubmit={handleCreateInbound}>
                        <div className="mb-5">
                            <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stuff Id</label>
                            <input type="text" id="stuff_id" placeholder="Ketik id Stuff"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, stuff_id: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                            <input type="text" id="total" placeholder="Ketik Nama Barang"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, total: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input type="date" id="date" placeholder="Ketik Nama Barang"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, date: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="proff_file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload File</label>
                            <input type="file" id="proff_file" placeholder="Upload File" 
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                onChange={e => setForms({ ...forms, proff_file: e.target.files[0] })} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                        
                    </form>
                    <Link to='/inbound'>
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
