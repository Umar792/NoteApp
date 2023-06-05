import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNote.css";
import { UseNoteContext } from "../../ContextApi/Context/NoteContext";
import Loading from "../loading/Loading";

const CreateNote = () => {
  const { creteNote, loading } = UseNoteContext();
  const navigate = useNavigate();
  const [data, setdata] = useState({
    description: "",
    title: "",
  });

  const dataChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const datasend = () => {
    creteNote(data.title, data.description, navigate);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="create_your_note">
          <div className="create_your_note_child">
            <h1 className="text-2xl font-bold text-center mt-2">Create Note</h1>
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
                    value={data.title}
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description">Discription</label>
                <div className="inputs">
                  <input
                    className="w-[100%]"
                    type="text"
                    required
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={dataChange}
                  />
                </div>
              </div>

              <button onClick={datasend}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNote;
