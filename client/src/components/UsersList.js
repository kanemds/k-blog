import React from 'react'
import { Link } from 'react-router-dom'
import user from '../../../server/models/user'
import { useGetUsersQuery } from '../redux/users/usersApiSlice'


const UsersList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let contnet
  if (isLoading) {
    contnet = <p>"Loading..."</p>
  } else if (isSuccess) {
    contnet = (
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.userName}</li>
          })}
        </ul>
        <Link to='/welcome'>Back to Welcome</Link>
      </div>
    )
  } else if (isError) {
    contnet = <p>{JSON.stringify(error)}</p>
  }


  return contnet
}

export default UsersList