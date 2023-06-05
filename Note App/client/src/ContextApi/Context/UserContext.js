import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/UserReducer";
import { toast } from "react-toastify";

const UserContext = createContext();

const initialValue = {
  loading: false,
  Authanticated: false,
  Error: "",
  user: {},
  myNotes: [],
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     state.isAuthanticated = true;
  //   }
  // }, []);

  // ----------------- user Registration
  const UserRegistration = async (username, email, password, navigate) => {
    try {
      dispatch({ type: "USER_REGISTRATION_LOAD" });

      const res = await fetch(
        "https://scary-red-fossa.cyclic.app//registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      dispatch({ type: "USER_REGISTRATION_LOAD_FAIL" });
      const data = await res.json();

      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/login");
      }

      dispatch({ type: "USER_REGISTRATION_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "USER_REGISTRATION_LOAD_ERROR",
        payload: error.message,
      });
    }
  };

  // ----------------------- User Login

  const UserLogin = async (email, password, navigate) => {
    try {
      dispatch({ type: "USER_LOGIN_LOAD" });
      const res = await fetch("https://scary-red-fossa.cyclic.app//login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      dispatch({ type: "USER_LOGIN_LOAD_FAIL" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        localStorage.setItem("Notetoken", data.token);
        navigate("/");
      }
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_LOAD_ERROR",
        payload: error.message,
      });
    }
  };

  // -------------------- get profile
  const getProfile = async () => {
    try {
      dispatch({ type: "GET_PROFILE_LOAD" });
      const res = await fetch("https://scary-red-fossa.cyclic.app//profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Notetoken"),
        },
      });
      dispatch({ type: "GET_PROFILE_LOAD_FAIL" });
      const data = await res.json();
      dispatch({ type: "GET_PROFILE_LOAD_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({
        type: "GET_PROFILE_LOAD_ERROR",
        payload: error.message,
      });
    }
  };

  // -----logout
  const logout = async (navigate) => {
    try {
      dispatch({ type: "LOGOUT_USER_LOAD" });
      localStorage.removeItem("Notetoken");
      dispatch({ type: "LOGOUT_USER_SUCCESS" });
    } catch (error) {
      dispatch({ type: "LOGOUT_USER_FAIL", payload: error.message });
    }
  };

  // ----------------- get login user notes
  const getLoginUserNotes = async () => {
    try {
      dispatch({ type: "GET_LOGIN_USER_NOTES_LOAD" });
      const res = await fetch(
        "https://scary-red-fossa.cyclic.app//getmyNotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Notetoken"),
          },
        }
      );
      dispatch({ type: "GET_LOGIN_USER_NOTES_LOAD_FAIL" });
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_LOGIN_USER_NOTES_LOAD_SUCCESS",
        payload: data.Notes,
      });
    } catch (error) {
      dispatch({
        type: "GET_LOGIN_USER_NOTES_LOAD_ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Notetoken");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS", payload: true });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        UserRegistration,
        UserLogin,
        getProfile,
        logout,
        getLoginUserNotes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UseUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserContextProvider, UseUserContext };
