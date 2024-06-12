import { useState, useEffect } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function StockStuffCreate() {
    const [forms, setForms] = useState({ keterangan: '', periksa: '', barang: '' });
    const [error, setError] = useState({});
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            console.log(res.data.data);
            setServices(res.data.data);
        })
        .catch(err => {
            setError(err.response.data);
            console.error(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            }
        });
    }, [navigate]);

    const handleCreateService = (event) => {
        event.preventDefault();
        instance.post('service', forms)
            .then(res => {
                navigate('/service');
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Berhasil Menambah Data!'
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
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue mb-10">Tambah Service</h5>
                    </div>
                    <form className="max-w-sm mx-auto" onSubmit={handleCreateService}>
                        <div className="mb-5">
                            <label htmlFor="barang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Barang</label>
                            <select id="barang" defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, barang: e.target.value })}>
                                <option value="">Pilih Barang</option>
                                {services.map(service => (
                                    
                                        <option key={service.id} value={service.name}>
                                            {service.name}
                                        </option>
                                    
                                ))}
                            </select>
                        </div>
                       
                        <div className="mb-5">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status Pengembalian</label>
                            <select id="category" defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, periksa: e.target.value })}>
                                <option value="">Pilih Status</option>
                                <option value="belum">Belum</option>
                                <option value="sudah">Sudah</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keterangan</label>
                            {/* <input type="text" id="notes" placeholder="..."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForms({ ...forms, notes: e.target.value })} /> */}

                            <textarea id="notes" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="...." onChange={e => setForms({ ...forms, keterangan: e.target.value })}></textarea>
                        </div>


                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                    <Link to='/stock'>
                        <button type="button" className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Kembali</span>
                        </button>
                    </Link>
                </div>
            </div>
        </Case>
    );
}
