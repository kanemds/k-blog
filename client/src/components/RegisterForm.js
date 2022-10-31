import React, { useState } from 'react'



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// from 8 - 24 length, at least one: lower, uper, number and one of !@#$%  
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const RegisterForm = () => {

  const userRef = useRef()
  const errRef = useRef()

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

  return (
    <div>RegisterForm</div>
  )
}

export default RegisterForm