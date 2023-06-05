import React, { useEffect } from "react";
import "./Notes.css";
import { UseNoteContext } from "../../ContextApi/Context/NoteContext";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../ContextApi/Context/UserContext";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Loading from "../loading/Loading";

const Note = () => {
  const { AllNotes, AllNotesGet, deleteNote, loading } = UseNoteContext();
  const { user, Authanticated } = UseUserContext();

  const deleteNotebyOwner = (id) => {
    deleteNote(id, () => {
      AllNotesGet();
    });
  };

  useEffect(() => {
    AllNotesGet();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Note_Parent">
          {Authanticated && (
            <NavLink to="/createNote">
              <button className="create_note">Create Note</button>
            </NavLink>
          )}
          <div className="Notes">
            {AllNotes &&
              AllNotes.map((item) => {
                return (
                  <div className="all_notest_child" key={item._id}>
                    {user && user._id === item.author._id ? (
                      <div className="not_icon">
                        <NavLink to={`/updateNote/${item._id}`}>
                          <HiOutlinePencilAlt className="text-[green] cursor-pointer" />
                        </NavLink>
                        <MdDelete
                          className="text-[red] delete"
                          onClick={() => deleteNotebyOwner(item._id)}
                        />
                      </div>
                    ) : null}
                    <p className="author">
                      Author : <font>{item.author.username}</font>
                    </p>
                    <NavLink to={`/singlenote/${item._id}`}>
                      <h1>{item.title.slice(0, 22)}...</h1>
                    </NavLink>
                    <p className="dis">{item.description.slice(0, 110)}...</p>
                    <NavLink to={`/singlenote/${item._id}`}>
                      <button className="readmore">read more...</button>
                    </NavLink>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
