import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeRequest } from "../axios.js";
import useShowToask from "../hooks/useShowToask.js";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const showToast = useShowToask();

  const login = async (inputs, setErr, e, setLoadingLogin) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      if (inputs.email.trim() !== "" && inputs.password.trim() !== "") {
        const response = await makeRequest.post(
          "/login",
          {
            email: inputs.email,
            password: inputs.password,
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json; charset=UTF-8",
            },
            withCredentials: true,
          }
        );

        // data tra ve tu server co trong response.data
        // set cookie
        document.cookie = response.headers["set-cookie"];

        setErr(null);

        let { message, ...info } = response.data;
        showToast({ title: message, status: "success" });
        setCurrentUser(info);
        setLoadingLogin(false);
        navigate("/");
      } else throw new Error("Vui lòng nhập đầy đủ dữ liệu!");
    } catch (err) {
      setLoadingLogin(false);
      if (err.response?.data) setErr(err.response.data.message);
      else if (err.request) {
        console.log(err.request);
      } else setErr(err.message);
    }
  };

  const register = async (inputs, setErr, e, setLoadingSignUp) => {
    e.preventDefault();
    setLoadingSignUp(true);
    try {
      if (
        inputs.username.trim() !== "" &&
        inputs.email.trim() !== "" &&
        inputs.password.trim() !== "" &&
        inputs.fullname.trim() !== ""
      ) {
        const response = await makeRequest.post(
          "/register",
          {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
            fullname: inputs.fullname,
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json; charset=UTF-8",
            },
            withCredentials: true,
          }
        );

        // data tra ve tu server co trong response.data
        // set cookie
        document.cookie = response.headers["set-cookie"];

        let { message, ...info } = response.data;
        setCurrentUser(info);
        setErr(null);
        showToast({ title: message, status: "success" });
        setLoadingSignUp(false);

        navigate("/");
      } else {
        throw new Error("Vui lòng nhập đầy đủ dữ liệu!");
      }
    } catch (err) {
      setLoadingSignUp(false);
      if (err.response?.data) setErr(err.response.data.message);
      else if (err.request) {
        console.log(err.request);
      } else setErr(err.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, login, register }}>
      {children}
    </UserContext.Provider>
  );
};
