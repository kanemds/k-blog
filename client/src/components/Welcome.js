import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "../redux/auth/authSlice"
import { Link } from "react-router-dom"

import React from 'react'

const Welcome = () => {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user.userName}` : Welcome
  const showToken = `${token.slice(0, 9)}...`


  return (
    <div>
      {welcome}
      {showToken}
    </div>

  )
}

export default Welcome