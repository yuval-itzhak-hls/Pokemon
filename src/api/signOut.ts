
export const signOut = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("No access token found.");
    return false;
  }
  try {
    await fetch("http://localhost:3000/users/signout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
    });
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    return true;
  } catch (err) {
    alert("Sign out failed.");
    return false;
  }
};
