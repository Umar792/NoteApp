import React, { useEffect } from "react";
import { UseNoteContext } from "../../ContextApi/Context/NoteContext";
import { useParams } from "react-router-dom";
import "./SingleNote.css";
import Loading from "../loading/Loading";

const SingleNote = () => {
  const { getSingleNote, loading, singleNote } = UseNoteContext();
  const { id } = useParams();
  useEffect(() => {
    getSingleNote(id);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="single_note">
          <h1>{singleNote && singleNote.title}</h1>
          <p>{singleNote && singleNote.description}</p>
        </div>
      )}
    </>
  );
};

export default SingleNote;
