import React, { useEffect, useState } from "react";
import Case from '../../components/Case'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Profile(){
    const[profile, setProfile] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    console.log(token) 

    useEffect(() => {
        axios.get('http://localhost:8000/profile',{
            headers: {
            'Authorization': 'Bearer ' + token,
            }
        })
        .then(res=>{
            console.log("Profile data:", res.data); 
            setProfile(res.data.data)
        })
        .catch(err=>{
            console.error(err);
            if(err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda Belum Login!'))
            }
        });
    })

   


    return(
        <Case>
   
<header className="bg-gray-800 min-h-screen">
  <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Welcome , {profile.username}</h1>

        <p className="mt-1.5 text-sm text-gray-500">Jelajahi Website Ini Dengan Menjadi Nyata ☄</p>
      </div>

      
    </div>
  </div>
</header> 
        </Case>
    )
}
