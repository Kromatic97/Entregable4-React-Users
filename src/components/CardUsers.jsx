import axios from 'axios'
import React from 'react'


const CardUsers = ({user, getAllUsers, setUpdateInfo, handleOpenForm}) => {

  const deleteUser = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
    axios.delete(URL)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }
  
  const handleUpdateClick = () => {
    setUpdateInfo(user)
    handleOpenForm()
  }

  return (
    <article className='card'>
        <h2 className='card__name'>{user["first_name"]}</h2>
        <hr/>
        <ul className='card__list'>
            <li className='card__item'><b>Email:</b> <span>{user.email}</span></li>
            <li className='card__item'><b>Birthay:</b><span>{user.birthday}</span></li>
        </ul>
        <div className='card__footer'>
        <button onClick={deleteUser} className='card__btn'>Delete</button>
        <button onClick={handleUpdateClick} className='card__btn'>Update</button>
        </div>
    </article>
  )
}

export default CardUsers