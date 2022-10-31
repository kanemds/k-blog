import React, { useRef, useEffect, useState } from 'react'
import { Paper, Box, Button, TextField, Typography, Link } from '@mui/material'



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/
// from 8 - 24 length, at least one: lower, uper, number and one of !@#$%  
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
// \w matches any words
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const RegisterForm = () => {


  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)


  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)


  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)



  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
  }, [pwd])

  useEffect(() => {
    const match = matchPwd === pwd
    setValidMatch(match)
    console.log(validMatch)
  }, [matchPwd, pwd])

  const isDisable = !validName || !validEmail || !validMatch || !validPwd ? true : false

  const handleSubmit = async (e) => {
    e.preventDefault()
    const vn = USER_REGEX.test(user)
    const ve = EMAIL_REGEX.test(email)
    const vp = PWD_REGEX.test(pwd)
    if (!vn || !ve || !vp) {
      setErrorMessage("Invalid Entry")
      return
    }
    setSuccess(true)
    console.log(success)
  }


  return (





    <Paper component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', p: 2, maxWidth: "600px" }}>

      {success ?
        <>
          <Typography variant="h4">User Created!</Typography>
          <Link href='/signIn' underline="none">Sign In</Link>
        </>

        : (
          <>
            <Typography sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 4 }} variant="h4" >Register</Typography>
            <TextField sx={{ pb: 2 }} type='text' label="User Name" variant="outlined" required
              onChange={e => setUser(e.target.value)}
            />
            {validName || user.length === 0 ? "" :
              <Typography>User Name must be 4 to 24 characters</Typography>
            }
            <TextField sx={{ pb: 2 }} type='email' label="E-mail" variant="outlined" required
              onChange={e => setEmail(e.target.value)}
            />
            {validEmail || email.length === 0 ? "" :
              <Typography>This Email is invalid, Please try again</Typography>
            }
            <TextField sx={{ pb: 2 }} type='password' label="Password" variant="outlined" required
              onChange={e => setPwd(e.target.value)}
            />
            {validPwd || pwd.length === 0 ? "" :
              <Typography>
                Password must be 8 to 24 characters and with the following characters: <br />
                one capital letter
                <br />
                one number ( 0 - 9)
                <br />
                one special character:!,@,#,$,%
              </Typography>
            }
            <TextField sx={{ pb: 2 }} type='password' label="Password Comfirm" variant="outlined" required
              onChange={e => setMatchPwd(e.target.value)}
            />
            {matchPwd === pwd || matchPwd.length === 0 ? "" :
              <Typography>
                Comfirm password does not match with password, Please try again
              </Typography>
            }
            <Button disabled={isDisable} onClick={handleSubmit}>Submit</Button>
            <Button>Back</Button>
          </>
        )}
    </Paper>
  )
}

export default RegisterForm