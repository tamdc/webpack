import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import { Link } from "react-router-dom";

const Users = () => {
  const [{ isLoading, isError, data }] = useUsers();
  return (
    <div>
      <h1>Users</h1>
      {isError && <div>Something went wrong...</div>}
      <ul>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Users;
