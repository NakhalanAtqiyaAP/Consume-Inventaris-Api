import {useEffect, useState} from "react";
import Case from "../../components/Case";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";

export default function UserEdit() {
const[forms,setForms] = useState({username: '', email:'', password: '', role: ''})

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
    instance.get(`user/${id}`)
        .then(res => {
            setForms(res.data.data)
        })
        .catch(err =>{
            console.log(err.response)
        })
        
},[id])

const handleEditUser = (event) =>{
    event.preventDefault();

    instance.put(`user/${id}`, forms)
    .then(res => {
        navigate('/user')
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
          <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
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
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white mb-10 text-shadow-blue">Edit Stuff</h5>
                    </div>
                    <form className="max-w-sm mx-auto" onSubmit={handleEditUser}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" id="name" placeholder="Ketik Nama Username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, username: e.target.value })} defaultValue={forms.username} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="email" placeholder="user@gmail.com"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, email: e.target.value })} defaultValue={forms.email} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="text" id="password" placeholder="******"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, password: e.target.value })} defaultValue={forms.password} required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select id="role" defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, role: e.target.value })}>
                                <option value="">Pilih Kategori Role</option>
                                <option value="admin" selected={forms.role == 'admin' ? 'selected': ''}>Admin</option>
                                <option value="staff" selected={forms.role == 'staff' ? 'selected': ''}>Staff</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ubah</button>
                        </div>
                    </form>
                    <Link to='/user'>
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
