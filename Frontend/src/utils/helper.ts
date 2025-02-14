export const getUserDetails = () => {
  const user = sessionStorage.getItem("UserDetails");
  return user ? JSON.parse(user) : null;
};
