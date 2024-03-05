import React from "react";
import { useParams } from "react-router-dom";

const User = ({ id, name }) => {
  const { userId } = useParams();
  return (
    <div>
      <p>{` user ${name} has id ${userId}`}</p>
    </div>
  );
};

export default User;
