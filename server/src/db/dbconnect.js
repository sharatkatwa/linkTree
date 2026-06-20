import mongoose from "mongoose";
import env from "../../config/config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.getDefaultResultOrder("ipv4first");

const DBconnect = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log("mongodb connected");
};

export default DBconnect;
