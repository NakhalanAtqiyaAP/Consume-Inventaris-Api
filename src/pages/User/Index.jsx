import axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function User() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [search, setSearch] = useState('');
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
        instance.get('user', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res => {
            setUsers(res.data.data);
            setFilteredUsers(res.data.data);
        })
        .catch(err => {
            setError(err.response.data);
            console.error(err);
            if (err.response.status === 401) {
                navigate('/login?message' + encodeURIComponent('Anda Belum Login!'));
            }
        });
    }, [navigate]);

    const deleteUser = (id) => {
        instance.delete(`user/${id}`)
            .then(res => {
                setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
                setFilteredUsers(currentUsers => currentUsers.filter(user => user.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: res.data.message,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.error(error);
                setError({ message: error.message });

                const errorData = error.response.data;
                console.log(errorData);

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData.message
                });  
            });
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        const searchQuery = event.target.value.toLowerCase();
        //mengecek apakah mengandung seacrh query, 
        const filtered = users.filter(user =>
            //.toLowerCase() mengubah huruf jadi huruf kecil , agar lebih flexsibel
            // .includes(seacrhQuery) memeriksa mengandung seacrh query yang mengandung substring
            user.username.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            user.role.toLowerCase().includes(searchQuery)
        );
        setFilteredUsers(filtered);     //Menampilkan data-data yang di filter/seacrh
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white text-shadow-blue">User</h5>
                    <div className="flex justify-end">

                    <div className="flex justify-end mb-4 mr-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearch}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>


                        <Link to="/user/create"> 
                            <button className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Tambah
                                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                            </button>
                        </Link>
                        <Link to="/user/trash"> 
                            <button className="text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Trash
                            </button>
                        </Link>
                        
                    </div>

                  
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Username</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, id) => (
                                    <tr key={user.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{user.username}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{user.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={'/user/edit/' + user.id}>
                                                <button className="px-4 py-2 bg-blue-700 rounded-lg mr-2 font-bold text-white hover:bg-blue-800">Edit</button>
                                            </Link>
                                            <button onClick={() => deleteUser(user.id)} type="button" className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white hover:bg-red-700">Hapus</button>
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
