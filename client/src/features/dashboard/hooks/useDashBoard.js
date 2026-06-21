import {
  addLink,
  clicksPerDay,
  getMe,
  getMyClicks,
  removeLink,
} from "../services/dashboard.api";

const useDashboard = () => {
  const addMyLinks = async (data) => {
    try {
      const res = await addLink(data);
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  const removeMyLinks = async (linkId) => {
    try {
      const res = await removeLink(linkId);
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  const getClicks = async () => {
    try {
      const res = await getMyClicks();
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  const getClicksPerDay = async () => {
    try {
      const res = await clicksPerDay();
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  const getMyProfile = async () => {
    try {
      const res = await getMe();
      return res;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  return {
    addMyLinks,
    removeMyLinks,
    getClicks,
    getClicksPerDay,
    getMyProfile,
  };
};

export default useDashboard;
