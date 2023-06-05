const UserReducer = (state, action) => {
  switch (action.type) {
    //  -------------AUTH_SUCCESS
    case "AUTH_SUCCESS":
      return {
        ...state,
        Authanticated: action.payload,
      };

    // -------------------- USER REGISTRATION
    case "USER_REGISTRATION_LOAD":
      return {
        ...state,
        loading: true,
      };
    case "USER_REGISTRATION_LOAD_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "USER_REGISTRATION_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "USER_REGISTRATION_LOAD_ERROR":
      return {
        ...state,
        Error: action.payload,
      };

    // -------------------- user loginn
    case "USER_LOGIN_LOAD":
      return {
        ...state,
        loading: true,
        Authanticated: false,
      };
    case "USER_LOGIN_LOAD_FAIL":
      return {
        ...state,
        loading: false,
        Authanticated: false,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        Authanticated: true,
        user: action.payload,
      };
    case "USER_LOGIN_LOAD_ERROR":
      return {
        ...state,
        Error: action.payload,
        Authanticated: false,
      };

    // --------------- get profile
    case "GET_PROFILE_LOAD":
      return {
        ...state,
        loading: true,
      };
    case "GET_PROFILE_LOAD_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "GET_PROFILE_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "GET_PROFILE_LOAD_ERROR":
      return {
        ...state,
        Error: action.payload,
      };

    // // ======================= logout

    case "LOGOUT_USER_LOAD":
      return {
        ...state,
        loading: true,
        Authanticated: true,
      };

    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        Authanticated: false,
        user: {},
      };

    case "LOGOUT_USER_FAIL":
      return {
        ...state,
        loading: false,
        Authanticated: false,
        Error: action.payload,
      };

    // ---------------get login user notes
    case "GET_LOGIN_USER_NOTES_LOAD":
      return {
        ...state,
        loading: true,
      };
    case "GET_LOGIN_USER_NOTES_LOAD_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "GET_LOGIN_USER_NOTES_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        myNotes: action.payload,
      };
    case "GET_LOGIN_USER_NOTES_LOAD_ERROR":
      return {
        ...state,
        loading: false,
        Error: action.payload,
      };

    default:
      return state;
  }
};
export default UserReducer;
