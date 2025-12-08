import React from "react"

const Dashboard = () => {
    
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">

            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white mb-4">
                <img 
                    src={user?.profileImage || "/defaultPic.png"} 
                    alt="profile" 
                    className="w-full h-full object-cover"
                />
            </div>

            <h1 className="text-2xl font-bold">Welcome {user?.firstName}</h1>

            <p className="opacity-70 mt-2">{user?.email}</p>

        </div>
    )
}

export default Dashboard
