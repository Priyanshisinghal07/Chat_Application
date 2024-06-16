import React, { useState } from 'react'
import Input from "../../components/Input"
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'


const Form = ({
    isSignInPage = true,
}) => {
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    })
   
   const navigate = useNavigate()

   const handleSubmit = async(e)=>{
    console.log ('data :>>', data);
    e.preventDefault()
    const res = await fetch(`http://localhost:8000/api/${isSignInPage ? 'login' : 'register'}`,{
      method:'POST',
       headers: {
        'Content-Type' : 'application/json'
       },
       body: JSON.stringify(data)
    })
    if(res.status === 400){
      alert('Invalid Credentials')
    }else{
      const resData = await res.json()
     
      if(resData.token){
        localStorage.setItem('user:token', resData.token)
        localStorage.setItem('user:detail', JSON.stringify(resData.user))

        navigate('/')
      }
    }
   
   }
  return (
    <div className='bg-light h-screen flex items-center justify-center'>
    <div className='bg-white w-[500px] h-[500px]  shadow-lg rounded-lg flex flex-col justify-center items-center'>
      <div className='text-3xl font-extrabold '>
        Welcome {isSignInPage && 'Back'}</div>
        <div className='text-xl font-light mb-9'>{isSignInPage ? 'Sign in to get explored' : 'Sign up now to get started'} </div>
     <form  className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>
     { !isSignInPage && <Input label='Full name ' name='name' placeholder='Enter your full name' 
     onChange={(e) => setData({...data, fullName: e.target.value})} value={data.fullName} className='mb-6  w-[75%]'/>}
     <Input label='Email address ' type='email' name='email' placeholder='Enter your email'
     onChange={(e) => setData({...data,  email: e.target.value})} value={data.email} className='mb-6 w-[75%]'/>
     <Input label='Password' type='password' name='password'
     onChange={(e) => setData({...data,  password: e.target.value})}
      placeholder='Enter your password' value={data.password} className='mb-7 w-[75%]'/>
      <Button label={isSignInPage ? 'Sign in' : 'Sign up'} type='submit' className='w-[75%] mb-2' />
     </form>
     
      <div className='text-sm font-light'>{isSignInPage ? "Didn't have an account?" : "Already have an account? "}<span style={{color:'blue'}} className='text-primary text-sm cursor-pointer underline' onClick={() => navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)}>{isSignInPage ? "Sign up" : "Sign in"}</span></div>
      </div>
      </div>
   
  )
}

export default Form
