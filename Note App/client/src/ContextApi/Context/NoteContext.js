import React, { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/NoteReducer";
import { toast } from "react-toastify";

const NoteContext = createContext();

const initialVaalue = {
  loading: false,
  Error: "",
  AllNotes: [],
  singleNote: {},
};

const NoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialVaalue);

  //   --------------- get allNotes
  const AllNotesGet = async () => {
    try {
      dispatch({ type: "GET_ALL_NOTE_LOAD" });
      const res = await fetch("https://scary-red-fossa.cyclic.app/allNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "GET_ALL_NOTE_LOAD_FAIL" });
      const data = await res.json();
      dispatch({ type: "GET_ALL_NOTE_SUCCESS", payload: data.AllNotes });
    } catch (error) {
      dispatch({ type: "GET_ALL_NOTE_FAIL", payload: error.message });
    }
  };

  //   -------------- create Note

  const creteNote = async (title, description, navigate) => {
    try {
      dispatch({ type: "CREATE_NOTE_REQUEST" });
      const res = await fetch("https://scary-red-fossa.cyclic.app/CreateNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Notetoken"),
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      dispatch({ type: "CREATE_NOTE_Fail" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
      }
      dispatch({ type: "CREATE_NOTE_SUCCESS" });
    } catch (error) {
      dispatch({ type: "CREATE_NOTE_FAIL", payload: error.message });
    }
  };

  // ---------------- delete Note
  const deleteNote = async (id, navigate) => {
    try {
      dispatch({ type: "DELETE_NOTE_REQUEST" });
      const res = await fetch(
        `https://scary-red-fossa.cyclic.app/DeleteNote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Notetoken"),
          },
        }
      );
      dispatch({ type: "DELETE_NOTE_Fail" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
      }
      dispatch({ type: "DELETE_NOTE_SUCCESS" });
    } catch (error) {
      dispatch({ type: "DELETE_NOTE_FAIL", payload: error.message });
    }
  };

  // -----------------get single Note
  const getSingleNote = async (id) => {
    try {
      dispatch({ type: "GET_SINGLE_NOTE_REQUEST" });
      const res = await fetch(
        `https://scary-red-fossa.cyclic.app/singleNote/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Notetoken"),
          },
        }
      );
      dispatch({ type: "GET_SINGLE_NOTE_FAIL" });
      const data = await res.json();
      dispatch({ type: "GET_SINGLE_NOTE_SUCCESS", payload: data.note });
    } catch (error) {
      dispatch({ type: "GET_SINGLE_NOTE_FAIL", payload: error.message });
    }
  };

  // --------------- update note
  const updateNote = async (id, title, description, navigate) => {
    try {
      dispatch({ type: "UPDATE_NOTE_REQUEST" });
      const res = await fetch(
        `https://scary-red-fossa.cyclic.app/UpdateNote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Notetoken"),
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );
      dispatch({ type: "UPDATE_NOTE_Fail" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
      }
      dispatch({ type: "UPDATE_NOTE_SUCCESS" });
    } catch (error) {
      dispatch({ type: "UPDATE_NOTE_FAIL", payload: error.message });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        ...state,
        AllNotesGet,
        creteNote,
        deleteNote,
        getSingleNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const UseNoteContext = () => {
  return useContext(NoteContext);
};

export { NoteContext, NoteContextProvider, UseNoteContext };
