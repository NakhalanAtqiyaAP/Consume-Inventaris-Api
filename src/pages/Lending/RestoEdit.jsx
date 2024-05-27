import {useEffect, useState} from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link,useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";

export default function RestorationEdit() {
const[forms,setForms] = useState({date_time: '', total_good_stuff: '', total_defect_stuff:'', lending_id:'', user_id:'' })

const params= useParams();
const id = params.id

const[error, setError] = useState([])
const navigate = useNavigate();
const token = localStorage.getItem('access_token');

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Authorization' : 'Bearer ' + token
    }
})

useEffect(() => {
    instance.get(`restoration/${id}`)
        .then(res => {
            setForms(res.data.data)
        })
        .catch(err =>{
            console.log(err.response)
        })
        
},[id])

const handleEditRestoration = (event) =>{
    event.preventDefault();

    instance.put(`restoration/${id}`, forms)
    .then(res => {
        navigate('/restoration')
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: res.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    })
    .catch(err => {
        // setError(err.response.data.data)
        console.log(err.response)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message|| 'Something went wrong!'
        });

    })
}

return(
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
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white mb-10 text-shadow-blue">Edit Restoration</h5>
                    </div>
                    <form className="max-w-sm mx-auto" onSubmit={handleEditRestoration}>
                    <div className="mb-5">
                            <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal dan Waktu</label>
                            <input type="date" id="date_time" placeholder="Waktu"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, date_time: e.target.value })}  defaultValue={forms.date_time} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="total_good_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Barang Baik</label>
                            <input type="number" id="total_good_stuff" placeholder="Total Barang Baik"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, total_good_stuff: e.target.value })}  defaultValue={forms.total_good_stuff} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="total_defect_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Barang Rusak</label>
                            <input type="number" id="total_defect_stuff" placeholder="Total Barang Rusak"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, total_defect_stuff: e.target.value })} defaultValue={forms.total_defect_stuff} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="lending_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Peminjaman</label>
                            <input type="text" id="lending_id" placeholder="ID Peminjaman"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, lending_id: e.target.value })} defaultValue={forms.lending_id} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID User</label>
                            <input type="text" id="user_id" placeholder="ID User"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, user_id: e.target.value })} defaultValue={forms.user_id} required />
                        </div>


                        
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ubah</button>
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
)


}
