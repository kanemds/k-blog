import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => {
    getUsers: builder.query({
      query: () => '/users',
      // after 5s auto logout, default value as 60s
      keepUnusedDataFor: 5
    })
  }
})

export const { useGetUsersQuery } = usersApiSlice