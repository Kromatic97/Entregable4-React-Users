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
          <h3>x</h3></div>
        <h2 className='form__title'>{updateInfo ? 'Update User':'New User'}</h2>
        
        <ul className='form__list'>

          <li className='form__item'>
          <label htmlFor='first_name'></label>
          <input placeholder='first name'{...register("first_name")}type="text" id='first_name'/>
          </li>

          <li className='form__item'>
          <label htmlFor='last_name'></label>
          <input placeholder='last name'{...register("last_name")} type="text" id='last_name'/>
          </li>

          <li className='form__item'>
          <label htmlFor='email'></label>
          <input placeholder='email'{...register("email")} type="email" id='email'/>
          </li>

          <li className='form__item'>
          <label htmlFor='password'></label>
          <input placeholder='password'{...register("password")} type="password" id='password'/>
          </li>


          <li className='form__item'>
          <label htmlFor='birthday'></label>
          <input {...register("birthday")} type="date" id='birthday'/>
          </li>
        </ul>
        <button className='form__btn'>{updateInfo ? 'Update':'Create'}</button>
    </form>
  )
}

export default Form