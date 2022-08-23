import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValue = {
  email:"",
  password:"",
  first_name:"",
  last_name:"",
  birthday:""

}

const Form = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {

  useEffect(() => {
    if(updateInfo){
      reset(updateInfo)
    }
    
  }, [updateInfo])
  

  const createUser = data => {
  const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.post(URL, data)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

const updateUser = data =>{
  const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
  axios.patch(URL, data)
  .then(res => {
    console.log(res.data);
    getAllUsers()
  })
  .catch(err => console.log(err))
}

const {register, reset, handleSubmit} = useForm()

const submit = data => {
  if(updateInfo){
    //update user
    updateUser(data)
    setUpdateInfo()

  }else{
    //create user
    createUser(data)
  }
  reset(defaultValue)
  handleCloseForm()
}

  return (
    <form onSubmit = {handleSubmit(submit)} className='form'>
        <div onClick={handleCloseForm}className='form__equis'>
          <h3><i class="bi bi-x-circle-fill"></i></h3></div>
        <h2 className='form__title'>{updateInfo ? 'Update User':'New User'}</h2>
        
        <ul className='form__list'>
          
          <div className='form_names'>
            
                <label htmlFor='first_name'><i className="bi bi-person-lines-fill"></i></label>
                <li className='form__item'>
                   <input placeholder='first name'{...register("first_name")}type="text" id='first_name'/>
                </li>

                <li className='form__item'>
                     <input placeholder='last name'{...register("last_name")} type="text" id='last_name'/>
                </li>
          </div>

          <li className='form__item'>
          <label htmlFor='email'><i className="bi bi-envelope-fill"></i></label>
          <input placeholder='email'{...register("email")} type="email" id='email'/>
          </li>

          <li className='form__item'>
          <label htmlFor='password'><i className="bi bi-key-fill"></i></label>
          <input placeholder='password'{...register("password")} type="password" id='password'/>
          </li>


          <li className='form__item'>
          <label htmlFor='birthday'><i className="bi bi-calendar-event-fill"></i></label>
          <input {...register("birthday")} type="date" id='birthday'/>
          </li>
        </ul>
        <button className='form__btn'>{updateInfo ? 'Update':'Create'}</button>
    </form>
  )
}

export default Form