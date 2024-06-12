import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import Swal from "sweetalert2";

export default function InboundRestore() {
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
        instance.get('inbound/trash', {
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
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
                }
            });
    }, [navigate]);

    const deletePermanentIdInbound = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this! This will delete permanent '${name}'.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`inbound/permanent/${id}`)
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

    const deletePermanentAllInbound = () => {
        if (inbound.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Data',
                text: 'Tidak ada data untuk dihapus.'
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! This will delete all items permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const deletePromises = inbound.map(item => instance.delete(`inbound/permanent/${item.id}`));

                Promise.all(deletePromises)
                    .then(() => {
                        setInbound([]);
                        Swal.fire({
                            title: "Deleted!",
                            text: "All items have been deleted.",
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

    const restoreInbound = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Ingin mengembalikan data '${name}' ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, restore it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.put(`inbound/restore/${id}`)
                    .then(res => {
                        setInbound(currentInbound => currentInbound.filter(inbound => inbound.id !== id));
                        Swal.fire({
                            title: "Restored!",
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

    const restoreAllInbound = () => {
        if (inbound.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Data',
                text: 'Tidak ada data untuk dikembalikan.'
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Ingin Mengembalikan semua data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, restore it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const restorePromises = inbound.map(item => instance.put(`inbound/restore/${item.id}`));

                Promise.all(restorePromises)
                    .then(() => {
                        setInbound([]);
                        Swal.fire({
                            title: "Restored!",
                            text: "All items have been restored.",
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
                        <button onClick={restoreAllInbound} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Restore ALL</button>
                        <button onClick={deletePermanentAllInbound} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hapus Semua</button>
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
                                            <img className="h-40 max-w-md hover:scale-125 ease-in duration-150" src={inbound.proff_file_url} alt={`proof-${inbound.id}`} />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button onClick={() => restoreInbound(inbound.id, inbound.name)} type="button" className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white hover:bg-green-700">Mengembalikan</button>
                                            <button onClick={() => deletePermanentIdInbound(inbound.id, inbound.name)} type="button" className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white hover:bg-red-700">Hapus</button>
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
