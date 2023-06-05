import React, { useEffect } from "react";
import "./Home.css";
import Note from "../Notes/Note";
import { UseNoteContext } from "../../ContextApi/Context/NoteContext";

const Home = () => {
  const { AllNotesGet } = UseNoteContext();
  useEffect(() => {
    AllNotesGet();
  }, []);
  return (
    <>
      <Note />
    </>
  );
};

export default Home;
