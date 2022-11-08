import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userName, accessToken } = action.payload
      state.userName = userName
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.userName = null
      state.token = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.userName
export const selectCurrentToken = (state) => state.auth.token