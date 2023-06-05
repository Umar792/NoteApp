import React, { useState } from "react";
import "./Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../ContextApi/Context/UserContext";

const Registration = () => {
  const { loading, UserRegistration } = UseUserContext();
  const navigate = useNavigate();

  const [passShow, setPassShow] = useState(false);
  // const [avatar, setAvatar] = useState(null);
  const [data, setdata] = useState({
    email: "",
    password: "",
    username: "",
  });

  const dataChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const datasend = () => {
    UserRegistration(data.username, data.email, data.password, navigate);
  };

  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   setAvatar(file);
  // };

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          <NavLink
            to="/"
            className="absolute left-[10px] top-[10] m-[15px] py-[5px] px-[30px] text-white bg-[red]"
          >
            Home
          </NavLink>
          <div className="login bg-gray-200">
            <div className="login_child">
              <h1 className="text-2xl font-bold text-center mt-2">
                Create your account
              </h1>
              <div className="login_inputs ">
                <div>
                  <label htmlFor="email">Full Name</label>
                  <div className="inputs">
                    <input
                      className="w-[100%]"
                      type="text"
                      required
                      id="email"
                      name="username"
                      value={data.username}
                      onChange={dataChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email Address</label>
                  <div className="inputs">
                    <input
                      className="w-[100%]"
                      type="email"
                      required
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={dataChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="pass">Password</label>
                  <div className="inputs">
                    <input
                      className="w-[100%]"
                      type={passShow ? "text" : "password"}
                      required
                      id="pass"
                      name="password"
                      value={data.password}
                      onChange={dataChange}
                    />
                    {passShow ? (
                      <AiFillEye onClick={() => setPassShow(!passShow)} />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setPassShow(!passShow)}
                      />
                    )}
                  </div>
                </div>
                {/* <div className="image ">
            {avatar ? <img src={URL.createObjectURL(avatar)} /> : <RxAvatar />}
            <label
              htmlFor="file-input"
              className="cursor-pointer ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <span>Upload a file</span>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                className="sr-only"
              />
            </label>
          </div> */}
                <button onClick={datasend}>SignUp</button>
                <NavLink to="/login">
                  <p>
                    {" "}
                    have any account? <font>Login</font>{" "}
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Registration;
