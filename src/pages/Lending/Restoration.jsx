import axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function Restoration() {
    const [resto, setResto] = useState([]); 
        const navigate =useNavigate()
        const[error, setError] = useState ([]);
        const token = localStorage.getItem('access_token');

        const instance = axios.create({
            baseURL: 'http://localhost:8000/',
            headers: {
                'Authorization': 'Bearer ' + token,
                }
        })
    
        useEffect(() => {
            instance.get('restoration',{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    }
            })
            .then(res =>{
                setResto(res.data.data)
            })
            .catch(err=>{
                setError(err.response.data);
                console.error(err);
                if(err.response.status == 401) {
                    navigate('/login?message' + encodeURIComponent('Anda Belum Login!'))
                }
            });
        },[navigate])

        const delateResto = (id, name) => {
            Swal.fire({
                title: "Are you sure?",
                text: `You won't be able to revert this! This will delete '${name}'.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    instance.delete(`restoration/${id}`)
                        .then(res => {
                            setResto(currenRestoration => currenRestoration.filter(restoration => restoration.id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: res.data.message,
                                icon: "success"
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            const errorMessage = error.response?.data?.message || error.message;
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errorMessage
                            });
                        });
                }
            });
        };
        
    return(
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
                <div className="items-center m-5 pb-10 pt-10">
                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue">Restoration</h5>
                    <div className="flex justify-end">
                        
                        <Link to="/restoration/create"> 
                         <button className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Tambah
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </button></Link>

                        <Link to="/restoration/trash"> 
                         <button className="text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Trash
                        </button></Link>
                    </div>
                    {/* {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            error.message
                                            // Object.entries(error).map(([key, value], i) => (
                                            //     <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            // ))
                                        }
                                    </ul>
                                </div>  
                            </div>
                        ) : ''
                    } */}

                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Lending</th>
                                    {/* <th scope="col" className="px-6 py-4">User</th> */}
                                    <th scope="col" className="px-6 py-4">Tanggal</th>
                                    <th scope="col" className="px-6 py-4">total good stuff</th>
                                    <th scope="col" className="px-6 py-4">total defec stuff</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
    {resto.map((resto, id) => (
        <tr key={resto.id} className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 text-white">{id + 1}</td>
            {resto.lending ? (
                <td className="whitespace-nowrap px-6 py-4 text-white">
                    ID Barang: {resto.lending.stuff_id}<br />
                    Nama: {resto.lending.name}<br />
                    total_stuff: {resto.lending.total_stuff}<br />
                    Waktu: {resto.lending.date_time}<br />
                    Catatan: {resto.lending.notes}<br />
                </td>
            ) : (
                <td className="whitespace-nowrap px-6 py-4 text-white">
                    Barang tidak ada
                </td>
            )}

            {/* {resto.user ? (
                <td className="whitespace-nowrap px-6 py-4 text-white">
                    Username: {resto.user.username}<br />
                    Email: {resto.user.email}<br />
                </td>
            ) : (
                <td className="whitespace-nowrap px-6 py-4 text-white">
                    Barang tidak ada
                </td>
            )} */}
            <td className="whitespace-nowrap px-6 py-4 text-white">{resto.date_time}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{resto.total_good_stuff}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{resto.total_defect_stuff}</td>
            
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={'/restoration/edit/' + resto.id}>
                    <button className="px-4 py-2 bg-blue-700 rounded-lg mr-2 font-bold text-white hover:bg-blue-800">Edit</button>
                </Link>
                <button onClick={() => delateResto (resto.id, resto.lending_id)} type="button" className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white hover:bg-red-700">Hapus</button>
            </td>
        </tr>
    ))}
</tbody>

                        </table>
                    </div>
                </div>
                
            </div>

            
        </Case>
    )
}



