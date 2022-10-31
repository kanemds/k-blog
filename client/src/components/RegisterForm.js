import React, { useRef, useEffect, useState } from 'react'
import { Paper, Box, Button, TextField, Typography } from '@mui/material'


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// from 8 - 24 length, at least one: lower, uper, number and one of !@#$%  
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const RegisterForm = () => {

  const userRef = useRef()
  const errorRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  // useEffect(() => {
  //   userRef.current.focus()
  // }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrorMessage('')
  }, [user, pwd, matchPwd])

  return (
    <Paper component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', p: 2, maxWidth: "600px" }}>
      <Typography sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 4 }} variant="h4" >Register</Typography>
      <TextField type='text' label="User Name" variant="outlined" required helperText="Incorrect entry." />
      <TextField type='email' label="E-mail" variant="outlined" required helperText="Incorrect entry." />
      <TextField type='password' label="Password" variant="outlined" required helperText="Incorrect entry." />
      <TextField type='password' label="Password Comfirm" variant="outlined" required helperText="Incorrect entry." />
      <Button>Submit</Button>
      <Button>Back</Button>
    </Paper>
  )
}

export default RegisterForm