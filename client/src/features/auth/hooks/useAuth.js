import { getMeApi, loginApi, logoutApi, registerApi } from "../services/auth.api";

const useAuth = () => {
  const registerUser = async (data) => {
    try {
   
      const res = await registerApi(data);
      return res
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (data) => {
    try {
   
      const res = await loginApi(data);
      return res
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = async () => {
    try {
   
      const res = await logoutApi();
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const getMeUser = async () => {
    try {
      const res = await getMeApi();
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  
  
  return {registerUser,loginUser,logoutUser,getMeUser}
};

export default useAuth
