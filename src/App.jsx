import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardUsers from './components/CardUsers'
import Form from './components/Form'

function App() {
  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  
  
  const getAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
    .then( res => 
      setUsers(res.data)
      )
    .catch(err => console.log(err))
  }

useEffect(() => {
  getAllUsers()
}, [])

  return (
    <div className="App">
      <h1>CRUD Users</h1>
      <Form 
      getAllUsers={getAllUsers}
      updateInfo={updateInfo}
      setUpdateInfo={setUpdateInfo}/>

      <div className='card-container'>
        {
          users?.map(user =>(
            <CardUsers 
            key={user.id}
            user={user}
            getAllUsers={getAllUsers}
            setUpdateInfo={setUpdateInfo}
            />
          ))
        }
      </div>

        
    </div>
  )
}

export default App
