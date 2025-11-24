import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import dp from "../assets/profile.jpg"
import axios from 'axios'


const Login = () => {
    let {sereverURL} = useContext(dataContext)


    let [email, setEmail] = useState(null)
    let [password, setPassword] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let data = await axios.post(sereverURL + "/api/login",{
                email,
                password

            },{withCredentials: true}) // to pass cookies
            console.log(data);
            
        } catch (error) {
            console.log(error.message);
            
        }
    }


  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[350px] bg-[#23272f] rounded-3xl flex flex-col justify-center items-center gap-5'>
            <h1 className='text-white text-[20px] font-bold'>Login</h1>
            <form className='w-full flex flex-col items-center justify-center gap-5' onChange={handleLogin} >
                <input type='email' placeholder='email' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {password} onChange={(e) => setPassword(e.target.value)}/>

                <button className='bg-[#149eca] px-2.5 py-[5px] rounded-lg font-bold cursor-pointer'>Login</button>
            </form>
        </div>

    </div>
  )
}

export default Login