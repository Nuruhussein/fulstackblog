const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Set the user data
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true, // Indicates ongoing update
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload, // Set the updated user data
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user, // Retain the previous user data
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null, // Clear the user data on logout
        isFetching: false,
        error: false,
      };
    default:
      return state; // Default case for unknown actions
  }
};

export default Reducer;
