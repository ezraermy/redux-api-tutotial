import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchUsers from '.store/users/usersSlice'

const UsersList = () => {
  const {users, isLoading, error } = useSelector((state) => state.users)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, fetchUsers])

  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error: {error.message}</div>
  }

  return (
    <ul>
      {users.map((user) => {
        <li key={user.id}>
          { user.firstName } { user.lastName }
        </li>
    })}
    </ul>
  )
}

export default UsersList;