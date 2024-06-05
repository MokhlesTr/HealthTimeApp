import React from "react";
import { AuthData } from "../../AuthWrapper";

export const Account = () => {
  const { user } = AuthData;
  return (
    <div>
      <h1>Your Acount:</h1>
      <p>Username: {user.name}</p>
    </div>
  );
};
