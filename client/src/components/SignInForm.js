import React, { useState, useEffect, useRef } from 'react'
import { Paper, Box, Button, TextField, Typography, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/auth/authSlice'
import { useLoginMutation } from '../redux/auth/authApiSlice'

const SignInForm = () => {


  const [type, setType] = useState(false)
  const userRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, seterrorMessage] = useState('')

  const [login, { isLoading }] = useLoginMutation()


  const handleType = () => {
    if (!type) {
      setType(true)
    }
    if (type) {
      setType(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      const userDate = await login({
        userName.length === 0 ? email : userName,
        password
      }).unwrap()
      setUserName('')
      setEmail('')
      setPassword('')
      navigate('/home')
    } catch (error) {

    }
  }


  return (
    <Paper component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', p: 2, maxWidth: "600px" }}>
      <Typography sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 4 }} variant="h4" >Sign in</Typography>
      <Button onClick={handleType}>sign in with {type ? "user name" : "email"}</Button>
      {type ?
        <TextField sx={{ pb: 2 }} type='text' label="User Name" variant="outlined" />
        :
        <TextField sx={{ pb: 2 }} type='text' label="Email" variant="outlined" />
      }
      <TextField sx={{ pb: 2 }} type='password' label="Password" variant="outlined" />
      <Button>Sign in</Button>
      <Button>Back</Button>
    </Paper>
  )
}

export default SignInForm