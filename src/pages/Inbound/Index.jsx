import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function Stuff() {
    const [inbound, setInbound] = useState([]); 
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const token = localStorage.getItem('access_token');

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });

    useEffect(() => {
        instance.get('inbound', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res => {
            setInbound(res.data.data);
        })
        .catch(err => {
            setError(err.response.data);
            console.error(err);
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda Belum Login!'));
            }
        });
    }, [navigate]);

    const deleteInbound = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this! This will delete id '${name}'.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`inbound/${id}`)
                    .then(res => {
                        setInbound(currentInbound => currentInbound.filter(inbound => inbound.id !== id));
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

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
                <div className="items-center m-5 pb-10 pt-10">
                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue">InboundStuff</h5>
                    <div className="flex justify-end">
                        <Link to="/inbound/create"> 
                            <button className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Tambah
                                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                            </button>
                        </Link>
                        <Link to="/inbound/trash"> 
                            <button className="text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Trash
                            </button>
                        </Link>
                    </div>
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 min-h-screen">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Barang</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Waktu</th>
                                    <th scope="col" className="px-6 py-4">Bukti</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inbound.map((inbound, id) => (
                                    <tr key={inbound.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{id + 1}</td>
                                        {inbound.stuff ? (
                                            <td className="whitespace-nowrap px-6 py-4 text-white">
                                                Nama: {inbound.stuff.name}<br />
                                                Category: {inbound.stuff.category}<br />
                                            </td>
                                        ) : (
                                            <td className="whitespace-nowrap px-6 py-4 text-white">
                                                Barang tidak ada
                                            </td>
                                        )}
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{inbound.total}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{inbound.date}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">
                                            <img className="h-40 max-w-md hover:scale-125 ease-in duration-150" src={inbound.proff_file_url} alt={`proof-${inbound.id}`}/>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {/* <Link to={'/inbound/edit/' + inbound.id}>
                                                <button className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                                    Ubah
                                                </button>
                                            </Link> */}
                                            <button onClick={() => deleteInbound(inbound.id, inbound.id)} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
