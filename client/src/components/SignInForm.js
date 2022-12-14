import React, { useState, useEffect, useRef } from 'react'
import { Paper, Box, Button, TextField, Typography, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/auth/authSlice'
import { useLoginMutation } from '../redux/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const SignInForm = () => {


  const [type, setType] = useState(false)
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



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await login({
        userName,
        password
      }).unwrap()
      dispatch(setCredentials({ ...userData, userName }))
      setUserName('')
      setEmail('')
      setPassword('')
      navigate('/welcome')
    } catch (error) {
      if (!error?.originalStatus) {
        seterrorMessage('No Server Response')
      } else if (error.originalStatus.status === 400) {
        seterrorMessage('Missing User Name, Email or Password')
      } else if (error.originalStatus.status === 401) {
        seterrorMessage('Unauthorized')
      } else {
        seterrorMessage('Login Failed')
      }
    }
  }

  const userNameInput = e => setUserName(e.target.value)
  const emailInput = e => setEmail(e.target.value)
  const passwordInput = e => setPassword(e.target.value)

  const content = isLoading ?
    <Typography>Loading... </Typography>
    :
    <Paper component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', p: 2, maxWidth: "600px" }}>
      <Typography>{errorMessage.length === 0 ? "" : errorMessage}</Typography>
      <Typography sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 4 }} variant="h4" >Sign in</Typography>
      <Button onClick={handleType}>sign in with {!type ? "user name" : "email"}</Button>
      {type ?
        <TextField sx={{ pb: 2 }} type='text' label="User Name" variant="outlined" value={userName} onChange={userNameInput} />
        :
        <TextField sx={{ pb: 2 }} type='text' label="Email" variant="outlined" value={email} onChange={emailInput} />
      }
      <TextField sx={{ pb: 2 }} type='password' label="Password" variant="outlined" value={password} onChange={passwordInput} />
      <Button onClick={handleSubmit}>Sign in</Button>
      <Button>Back</Button>
    </Paper>

  return content
}

export default SignInForm