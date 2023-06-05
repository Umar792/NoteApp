import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Accounts/Login";
import Registration from "./Component/Accounts/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseUserContext } from "./ContextApi/Context/UserContext";
import { UseNoteContext } from "./ContextApi/Context/NoteContext";
import CreateNote from "./Component/Notes/CreateNote";
import Header from "./Component/Home/Header";
import SingleNote from "./Component/Notes/SingleNote";
import UpdateNote from "./Component/Notes/UpdateNote";
import Profile from "./Component/Profile/Profile";

const App = () => {
  const { getProfile, Authanticated } = UseUserContext();
  const { AllNotesGet } = UseNoteContext();
  useEffect(() => {
    getProfile();
    AllNotesGet();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="colored" />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/createNote" element={<CreateNote />} />
        <Route exact path="/singlenote/:id" element={<SingleNote />} />
        <Route exact path="/updateNote/:id" element={<UpdateNote />} />
        {Authanticated && <Route exact path="/profile" element={<Profile />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
