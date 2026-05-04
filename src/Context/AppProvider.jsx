import React, { useReducer, useEffect } from "react";
import { AppContext } from "./AppContext";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
};

const accountReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: JSON.parse(savedUser),
      });
    }
  }, []);

  const login = (name, password) => {
    const users = [
      { name: "Anthony", password: "123456" },
      { name: "Faith", password: "abcdef" },
      { name: "Toheeb", password: "ghijkl" },
      { name: "Daniel", password: "mnopqr" },
      { name: "Clinton", password: "stuvwx" },
      { name: "Francis", password: "789011" },
      { name: "Pelumi", password: "123abc" },
      { name: "Simi", password: "456def" },
      { name: "Chibuike", password: "789ghi" },
      { name: "Maria", password: "011jkl" },
    ];

    const foundUser = users.find(
      (user) => user.name === name && user.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid credentials" };
    }

    const userWithAccount = {
    ...foundUser, accountNumber: String(1000 + users.indexOf(foundUser) + 1),
   };

    localStorage.setItem("user", JSON.stringify(userWithAccount));

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: userWithAccount,
    });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;