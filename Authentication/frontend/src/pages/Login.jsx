import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import dp from "../assets/profile.jpg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    let {sereverURL} = useContext(dataContext)
    let navigate = useNavigate()


    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let data = await axios.post(sereverURL + "/api/login",{
                email,
                password

            },{withCredentials: true}) // to pass cookies
            console.log(data);
            alert("Login successfully");
            
        } catch (error) {
            alert(error.response.data.message);
        }
    }


  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[350px] bg-[#23272f] rounded-3xl flex flex-col justify-center items-center gap-5'>
            <h1 className='text-white text-[20px] font-bold'>Login</h1>
            <form className='w-full flex flex-col items-center justify-center gap-5' onSubmit={handleLogin} >
                <input type='email' placeholder='email' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {password} onChange={(e) => setPassword(e.target.value)}/>


                <button className='bg-[#149eca] px-2.5 py-[5px] rounded-lg font-bold cursor-pointer'>Login</button>
                <p className='text-white '>Craete new account <span className='text-blue-300 cursor-pointer font-bold' onClick={() => navigate("/signup")}>Sign Up</span></p>

            </form>
        </div>

    </div>
  )
}

export default Login