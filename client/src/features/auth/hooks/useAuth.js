import { loginApi, logoutApi, registerApi } from "../services/auth.api";

const useAuth = () => {
  const registerUser = async (data) => {
    try {
   
      const res = await registerApi(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (data) => {
    try {
   
      const res = await loginApi(data);
      console.log(res); 
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = async () => {
    try {
   
      const res = await logoutApi();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return {registerUser,loginUser,logoutUser}
};

export default useAuth