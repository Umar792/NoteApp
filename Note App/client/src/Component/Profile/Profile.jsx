import React, { useEffect } from "react";
import { UseUserContext } from "../../ContextApi/Context/UserContext";
import "./Profile.css";
import Loading from "../loading/Loading";
import { UseNoteContext } from "../../ContextApi/Context/NoteContext";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";

const Profile = () => {
  const { user, getLoginUserNotes, myNotes } = UseUserContext();
  const { deleteNote, loading } = UseNoteContext();
  console.log(myNotes);

  useEffect(() => {
    getLoginUserNotes();
  }, []);

  const deleteNotebyOwner = (id) => {
    deleteNote(id);
  };

  return (
    <div className="owner_notes">
      <p className="owner_name">
        Name : <font>{user && user.username}</font>
      </p>
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="Note_Parent">
            <div className="Notes">
              {myNotes && myNotes.length === 0 ? (
                <span className="not_note">Kindly create a Note.</span>
              ) : (
                myNotes.map((item) => {
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
                })
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
