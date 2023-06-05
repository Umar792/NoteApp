import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateNote.css";
import { UseNoteContext } from "../../ContextApi/Context/NoteContext";
import Loading from "../loading/Loading";

const UpdateNote = () => {
  const { updateNote, loading, singleNote, getSingleNote, AllNotesGet } =
    UseNoteContext();
  const { id } = useParams();
  console.log(singleNote);

  const navigate = useNavigate();
  const [title, setTitle] = useState(singleNote ? singleNote.title : "");
  const [description, setdescription] = useState(
    singleNote ? singleNote.description : ""
  );

  useEffect(() => {
    getSingleNote(id);
  }, []);

  const datasend = () => {
    updateNote(id, title, description, navigate);
    AllNotesGet();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="create_your_note">
          <div className="create_your_note_child">
            <h1 className="text-2xl font-bold text-center mt-2">Update Note</h1>
            <div className="create_your_note_inputs ">
              <div>
                <label htmlFor="title">Title</label>
                <div className="inputs">
                  <input
                    className="w-[100%]"
                    type="text"
                    required
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description">Discription</label>
                <div className="inputs">
                  <textarea
                    className="w-[100%]"
                    rows={10}
                    type="text"
                    required
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={datasend}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateNote;
