const rootReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload
      };
    case "TOGGLE_LOGIN":
      return {
        ...state,
        showLogin: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;
