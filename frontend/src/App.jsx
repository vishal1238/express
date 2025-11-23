import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  let [username, setUsername] = useState(null)
  let [age, setAge] = useState(null)
  let [city, setCity] = useState(null)

  async function getRes() {
    // let res = await fetch("http://localhost:9000/")
    // let data = await res.json()
    // data
    // .then((e) => {
    //   console.log(e);
      
    // })
    // .catch((e) => {
    //   console.log(e);
      
    // })


    axios.post("http://localhost:9000/",{
      username,
      age,
      city
    })
    .then((e) =>{
      console.log(e.data);
    })
    .catch((e) => {
      console.log(e);
      
    })

  }

  return (
    <div>
      {/* <button onClick={() => getRes()}>Send</button> */}
      Username: <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
      Age: <input type="text" placeholder='age' value={age} onChange={(e) => setAge(e.target.value)}/>
      City: <input type="text" placeholder='city' value={city} onChange={(e) => setCity(e.target.value)}/>
      <button onClick={() => getRes()}>Send</button>
    </div>
  )
}

export default App