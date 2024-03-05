import axios from "axios";
import { useEffect, useState } from "react";
import useReducerWithLogger from "./useReducerWithLogger";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error("Invalid action type for fetching data...");
  }
};

const useDataFetch = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);

  const [{ isLoading, isError, data }, dispatch] = useReducerWithLogger(
    dataFetchReducer,
    {
      isLoading: false,
      isError: false,
      data: initData,
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!didCancel)
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        if (!didCancel) dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [{ isLoading, isError, data }, setUrl];
};

export default useDataFetch;
