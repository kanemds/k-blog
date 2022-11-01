import React, { useState } from 'react'
import { Paper, Box, Button, TextField, Typography, Link } from '@mui/material'

const SignInForm = () => {

  const [type, setType] = useState(false)

  const handleType = () => {
    if (!type) {
      setType(true)
    }
    if (type) {
      setType(false)
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