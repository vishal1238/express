import React, { useContext, useState } from 'react'
import dp from "../assets/profile.jpg"
import { dataContext } from '../context/UserContext'
import axios from 'axios'

const SignUp = () => {
    let {sereverURL} = useContext(dataContext)

    let [firstName, setFirstName] = useState(null)
    let [lastName, setLastName] = useState(null)
    let [userName, setUserName] = useState(null)
    let [email, setEmail] = useState(null)
    let [password, setPassword] = useState(null)

    const handleSignUP = async(e) =>{
        e.preventDefault()
        try {
            let data = await axios.post(sereverURL + "/api/signup",{
                firstName,
                lastName,
                userName,
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
        <div className='w-[90%] max-w-[500px] h-[550px] bg-[#23272f] rounded-3xl flex flex-col justify-center items-center gap-5'>
            <h1 className='text-white text-[20px] font-bold'>Sign Up</h1>
            <form className='w-full flex flex-col items-center justify-center gap-5' onSubmit={handleSignUP}>
                <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
                    <img src={dp} alt='' className='w-full h-full'/>
                    <div className='absolute w-full h-full bg-black top-0 opacity-0 hover:opacity-60 cursor-pointer flex justify-center items-center text-white font-bold text-3xl'>+</div>
                </div>
                <div className='w-[80%] h-[50px] flex justify-center items-center gap-3'>
                    <input type='text' placeholder='first name' className='w-[50%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <input type='text' placeholder='last name' className= 'w-[50%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <input type='text' placeholder='username' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type='email' placeholder='email' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {password} onChange={(e) => setPassword(e.target.value)}/>

                <button className='bg-[#149eca] px-2.5 py-[5px] rounded-lg font-bold cursor-pointer'>Sign Up</button>
            </form>
        </div>

    </div>
  )
}

export default SignUp