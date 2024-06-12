import React, { useEffect, useState } from 'react';
import Case from '../components/Case';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BarChartComponent from '../components/BarChart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons"; 


export default function Dashboard() {
    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [lendings, setLendings] = useState([]);
    const navigate = useNavigate();
    const [checkProses, setCheckProses] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);
    const token = localStorage.getItem('access_token');
    

    useEffect(() => {
        getDataStuffs();
        getDataUsers();
        getDataLendings();
    }, [checkProses]    );

    useEffect(() => {
        if (token) {
          axios.get('http://localhost:8000/profile', {
            headers: {
              'Authorization': 'Bearer ' + token,
            }
          })
            .then(res => {
              setIsLogin(true);
              setAuthUser(res.data.data);
            })
        } 
      });

    function getDataStuffs() {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum Login'));
                }
            });
    }

    function getDataUsers() {
        axios.get('http://localhost:8000/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum Login'));
                }
            });
    }

    function getDataLendings() {
        axios.get('http://localhost:8000/lending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                const data = res.data.data;
                console.log("Raw data from API:", data); // Debugging: Log raw data
    
                // mengelompokkan data berdasarkan date_time
                const groupedData = {};
                data.forEach(entry => {
                    const date = new Date(entry.date_time);
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                    if (!groupedData[formattedDate]) {
                        groupedData[formattedDate] = [];
                    }
                    groupedData[formattedDate].push(entry);
                });
    
                // membuat struktur Array baru yang berisi date(tanggal terformat sebelumnya) dan totalStuff
                const processedData = Object.keys(groupedData).map((date) => ({
                    date,
                    total_stuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
                    // total_stuff: groupedData[date].length nampilin berapa jumlah data lendings per tanggal
                }));
    
                console.log("Processed data:", processedData); // Debugging: Log processed data
    
                // simpan data ke state
                setLendings(processedData);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum Login'));
                }
            });
    }
    
    return (
        <Case>
            <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">
                                Total Stuffs: {stuffs.length}
                            </h1>
                        </div>
                    </div>
                </div>
    
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">
                                Total Users: {users.length}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            
            {
            isLogin && authUser['role'] === 'admin' && (
            <div className="">
            <h1 className="mb-4 items-center text-2xl font-extrabold dark:text-white text-center">Lendings
            <span className="bg-indigo-300 text-indigo-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded
             dark:bg-indigo-200 dark:text-indigo-800 ms-2">Data</span></h1>
             
            <BarChartComponent data={lendings} />
        </div>
            )
            }   


            



           
        </Case>
    );
    
}
