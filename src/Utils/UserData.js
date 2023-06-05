// Mendapatkan data pengguna dari localStorage
export const getUserDataFromLocalStorage = () => {
    const usersData = localStorage.getItem("user");
    return usersData ? JSON.parse(usersData) : null;
  };
  
  // Mendapatkan role pengguna dari localStorage
  export const getUserRoleFromLocalStorage = () => {
    const userData = getUserDataFromLocalStorage();
    return userData ? userData.role : "";
  };
  
  // Mendapatkan office pengguna dari localStorage
  export const getUserOfficeFromLocalStorage = () => {
    const userData = getUserDataFromLocalStorage();
    return userData ? userData.user : "";
  };
  
  // Mendapatkan id office pengguna dari localStorage
  export const getIdOfficeFromLocalStorage = () => {
    const userOffice = getUserOfficeFromLocalStorage();
    return userOffice ? userOffice.uid : "";
  };