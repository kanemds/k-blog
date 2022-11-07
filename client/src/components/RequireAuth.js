import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../redux/auth/authSlice"

import React from 'react'

const RequireAuth = () => {
  return (
    <div>RequireAuth</div>
  )
}

export default RequireAuth