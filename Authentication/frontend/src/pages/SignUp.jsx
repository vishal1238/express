import React, { useContext, useRef, useState } from 'react'
import dp from "../assets/profile.jpg"
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    let {sereverURL} = useContext(dataContext)
    let navigate = useNavigate()

    let [firstName, setFirstName] = useState(null)
    let [lastName, setLastName] = useState(null)
    let [userName, setUserName] = useState(null)
    let [email, setEmail] = useState(null)
    let [password, setPassword] = useState(null)

    let file = useRef(null)

    const handleSignUP = async(e) =>{
        e.preventDefault()
        try {
            let formdata = new FormData()
            formdata.append("firstName", firstName)
            formdata.append("lastName", lastName)
            formdata.append("userName", userName)
            formdata.append("email", email)
            formdata.append("password", password)

            if(backendImage){
                formdata.append("profileImage", backendImage)
            }
            let data = await axios.post(sereverURL + "/api/signup",formdata,
                {withCredentials: true,
                    headers: {"Content-Type": "multipart/from-data"}
                 }) // to pass cookies
            console.log(data);
            
        } catch (error) {
            console.log(error.message);  
        }
    }

    let [frontendImage, setFrontendImage]  = useState(dp)
    let [backendImage, setBackendImage]  = useState("")
    function handleImage(e){
        let file = e.target.files[0]
        setBackendImage(file)
        let image = URL.createObjectURL(file)
            setFrontendImage(image)
        
    }

  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
        <div className='w-[90%] max-w-[500px] h-[550px] bg-[#23272f] rounded-3xl flex flex-col justify-center items-center gap-5'>
            <h1 className='text-white text-[20px] font-bold'>Sign Up</h1>
            <form className='w-full flex flex-col items-center justify-center gap-5' onSubmit={handleSignUP}>
                <input type='file' hidden ref={file} onChange={handleImage}/>
                <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
                    <img src={frontendImage} alt='' className='w-full h-full'/>
                    <div className='absolute w-full h-full bg-black top-0 opacity-0 hover:opacity-60 cursor-pointer flex justify-center items-center text-white font-bold text-3xl' onClick={() => {file.current.click()}}>+</div>
                </div>
                <div className='w-[80%] h-[50px] flex justify-center items-center gap-3'>
                    <input type='text' placeholder='first name' className='w-[50%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <input type='text' placeholder='last name' className= 'w-[50%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <input type='text' placeholder='username' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type='email' placeholder='email' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' className= 'w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-2.5 py-[7px]' value = {password} onChange={(e) => setPassword(e.target.value)}/>

                <button className='bg-[#149eca] px-2.5 py-[5px] rounded-lg font-bold cursor-pointer'>Sign Up</button>
                <p className='text-white '>Already have an account? <span className='text-blue-300 cursor-pointer font-bold' onClick={() => navigate("/login")}>Login</span></p>
            </form>
        </div>
        
    </div>
  )
}

export default SignUp