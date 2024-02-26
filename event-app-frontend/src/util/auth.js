import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const expiration = localStorage.getItem("expiration");
  const expirationDate = new Date(expiration);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getTokenDuration();
  if (duration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token || token === "EXPIRED") {
    return redirect("/auth");
  }

  return null;
};
