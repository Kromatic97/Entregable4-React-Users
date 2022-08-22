import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardUsers from './components/CardUsers'
import Form from './components/Form'

function App() {
  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  
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

const handleOpenForm = () => setIsFormOpen(true)
const handleCloseForm= () => setIsFormOpen(false)
  return (
    <div className="App">
      <h1>Usuarios</h1>
      <button className='btn_usuario' onClick={handleOpenForm}> + Crear Nuevo Usuario</button>
      
      <div className={isFormOpen ? 'form-container' : 'form_none'}>
        <Form 
        getAllUsers={getAllUsers}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
        handleCloseForm={handleCloseForm}
        />
      </div>

      <div className='card-container'>
        {
          users?.map(user =>(
            <CardUsers 
            key={user.id}
            user={user}
            getAllUsers={getAllUsers}
            setUpdateInfo={setUpdateInfo}
            handleOpenForm={handleOpenForm}

            />
          ))
        }
      </div>

        
    </div>
  )
}

export default App
