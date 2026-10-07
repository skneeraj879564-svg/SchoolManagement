export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return payload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getUserRole = () => {
  const payload = getUserFromToken();

  if (!payload) {
    return null;
  }

  return (
    payload[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] || null
  );
};