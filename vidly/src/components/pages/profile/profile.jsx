import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../../contexts/userContext";
import auth from "../../../services/authService";

const Profile = () => {
  const user = useContext(UserContext);

  if (!auth.getCurrentUser()) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
