import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("userinfo")) || null, // Initialize from local storage
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        return; // No JWT, nothing to fetch
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT in the header
          },
        });

        dispatch({ type: "LOGIN_SUCCESS", payload: response.data }); // Set user data in context
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch({ type: "LOGIN_FAILURE" }); // Handle failure
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, []); // Run only once on initial load

  useEffect(() => {
    // Save the updated user data to local storage whenever it changes
    localStorage.setItem("userinfo", JSON.stringify(state.user));
  }, [state.user]); // Dependency on user state

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
