import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "../redux/auth/authSlice"
import { Link } from "react-router-dom"

import React from 'react'

const Welcome = () => {

  const user = useSelector(selectCurrentUser)
  console.log(user)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}` : Welcome
  const showToken = `${token.slice(0, 9)}...`


  return (
    <div>
      {welcome}
      <br />
      {showToken}
    </div>

  )
}

export default Welcome