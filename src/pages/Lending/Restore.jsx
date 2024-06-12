import axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Case from "../../components/Case";
import Swal from "sweetalert2";

export default function LendingRestore() {
        const [lending, setLending] = useState([]); 
        const navigate =useNavigate()
        const [filteredLendings, setFilteredLendings] = useState([]);
        const [search, setSearch] = useState('');
        const[error, setError] = useState ([]);
        const token = localStorage.getItem('access_token');

        const instance = axios.create({
            baseURL: 'http://localhost:8000/',
            headers: {
                'Authorization': 'Bearer ' + token,
                }
        })
    
        useEffect(() => {
            instance.get('lending/trash',{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    }
            })
            .then(res =>{
                setLending(res.data.data)
                setFilteredLendings(res.data.data);
            })
            .catch(err=>{
                setError(err.response.data);
                console.error(err);
                if(err.response.status == 401) {
                    navigate('/login?message' + encodeURIComponent('Anda Belum Login!'))
                }
            });
        },[navigate])

       
        const deletePermanentIdLending= (id, name) => {
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
                    instance.delete(`lending/permanent/${id}`)
                        .then(res => {
                            setLending(currenLending => currenLending.filter(lending => lending.id !== id));
                            setFilteredLendings(currentLending => currentLending.filter(lending => lending.id !== id));
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
 
        const deletePermanentAllLending = () => {
            if (lending.length === 0) {
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
                    const deletePromises = lending.map(item => instance.delete(`lending/permanent/${item.id}`));
    
                    Promise.all(deletePromises)
                        .then(() => {
                            setLending([]);
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
    
        const RestoreLending = (id, name) => {
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
                    instance.put(`lending/restore/${id}`)
                        .then(res => {
                            setLending(currenLending => currenLending.filter(lending => lending.id !== id));
                            setFilteredLendings(currentLending => currentLending.filter(lending => lending.id !== id));
                            Swal.fire({
                                title: "Mengembalikan!",
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

        const restoreAllLending = () => {
            if (lending.length === 0) {
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
                    const restorePromises = lending.map(item => instance.put(`lending/restore/${item.id}`));
    
                    Promise.all(restorePromises)
                        .then(() => {
                            setLending([]);
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
    
        const handleSearch = (event) => {
            setSearch(event.target.value);
            const searchQuery = event.target.value.toLowerCase();
            //mengecek apakah mengandung seacrh query, 
            const filtered = lending.filter(lending =>
                  //.toLowerCase() mengubah huruf jadi huruf kecil , agar lebih flexsibel
                // .includes(seacrhQuery) memeriksa mengandung seacrh query yang mengandung substring
                lending.name.toLowerCase().includes(searchQuery) ||
                lending.date_time.toLowerCase().includes(searchQuery)
            );
            setFilteredLendings(filtered);  //Menampilkan data-data yang di filter/seacrh
        };
    
    return(
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-screen">
                <div className="items-center m-5 pb-10 pt-10">
                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue">Lending</h5>
                    <div className="flex justify-end">
                    <div className="flex justify-end mb-2 mr-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={handleSearch}
                                className="px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    <button onClick={restoreAllLending} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Restore ALL</button>
                    <button onClick={deletePermanentAllLending} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hapus Semua</button>
                      
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
                                    <th scope="col" className="px-6 py-4">Barang</th>
                                    <th scope="col" className="px-6 py-4">Notes</th>
                                    <th scope="col" className="px-6 py-4">Tanggal</th>
                                    <th scope="col" className="px-6 py-4">total stuff</th>
                                    <th scope="col" className="px-6 py-4">Stuff</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
    {filteredLendings.map((lending, id) => (
        <tr key={lending.id} className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 text-white">{id + 1}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{lending.name}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{lending.notes}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{lending.date_time}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{lending.total_stuff}</td>
            {lending.stuff ? (
                <td className="whitespace-nowrap px-6 py-4 text-white">
                    Nama: {lending.stuff.name}<br />
                    Category: {lending.stuff.category}<br />
                </td>
            ) : (
                <td className="whitespace-nowrap px-6 py-4 text-white">
                    Barang tidak ada
                </td>
            )}
            <td className="whitespace-nowrap px-6 py-4">
                <button onClick={() => RestoreLending(lending.id, lending.name)} type="button" className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white hover:bg-green-700">Mengembalikan</button>
                <button onClick={() => deletePermanentIdLending (lending.id, lending.name)} type="button" className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white hover:bg-red-700">Hapus</button>
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



