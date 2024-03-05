import { useEffect, useReducer, useRef } from "react";

const addLoggerToDispatch = (dispatch) =>
  function (action) {
    console.groupCollapsed("Action: ", action.type);
    return dispatch(action);
  };

const useReducerWithLogger = (initReducer, initState) => {
  const ref = useRef(initState);
  const [state, dispatch] = useReducer(initReducer, initState);

  useEffect(() => {
    if (ref.current !== state) {
      console.log("State previous: ", ref.current);
      console.log("State after: ", state);
      ref.current = state;
    }
    console.groupEnd();
  }, [state]);

  const enhanceReducerWithLogger = addLoggerToDispatch(dispatch);

  return [state, enhanceReducerWithLogger];
};

export default useReducerWithLogger;
