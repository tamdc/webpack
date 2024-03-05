import { useEffect } from "react";
import useReducerWithLogger from "./useReducerWithLogger";

const usersFetchReducer = (state, action) => {
  switch (action.type) {
    case "USERS_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "USERS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "USERS_FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error("action is Invalid for usersFetchReducer");
  }
};

const mockingData = {
  users: [
    {
      id: 1,
      name: "tam.dangc",
    },
    {
      id: 2,
      name: "tamdc",
    },
  ],
};

const useUsers = () => {
  const [{ isLoading, isError, data }, dispatch] = useReducerWithLogger(
    usersFetchReducer,
    {
      isLoading: false,
      isError: false,
      data: { users: [] },
    }
  );

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: "USERS_FETCH_INIT" });
      try {
        const result = await new Promise((resolve) => {
          setTimeout(() => resolve(mockingData), 1000);
        });
        dispatch({ type: "USERS_FETCH_SUCCESS", payload: result });
      } catch (error) {
        dispatch({ type: "USERS_FETCH_FAILURE" });
      }
    };

    fetchUsers();
  }, []);

  return [{ isLoading, isError, data }];
};

export default useUsers;
