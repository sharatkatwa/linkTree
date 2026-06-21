import { addCount } from "../../dashboard/services/dashboard.api";
import { getLinksByUsername, getProfiles } from "../services/home.api";

const useHome = () => {
  const getAllUserProfiles = async () => {
    const res = await getProfiles();
    return res.data;
  };
  const getUserLinks = async (username) => {
    const res = await getLinksByUsername(username);
    return res.data;
  };

  const addUserClicks = async (linkId) => {
    try {
      const res = await addCount(linkId);
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return { getAllUserProfiles, getUserLinks, addUserClicks };
};

export default useHome;
