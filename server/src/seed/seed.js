import mongoose from "mongoose";
import env from "../../config/config.js";
import clickModel from "../models/click.model.js";
import linkModel from "../models/link.model.js";
import userModel from "../models/user.model.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.getDefaultResultOrder("ipv4first");
const users = [
  {
    username: "aarav",
    email: "aarav@example.com",
    password: "password123",
    bio: "Product notes, design systems, and useful resources.",
  },
  {
    username: "riya",
    email: "riya@example.com",
    password: "password123",
    bio: "Frontend projects and React learning links.",
  },
  {
    username: "kabir",
    email: "kabir@example.com",
    password: "password123",
    bio: "Content, tools, and creator resources.",
  },
  {
    username: "nisha",
    email: "nisha@example.com",
    password: "password123",
    bio: "Startup updates and founder resources.",
  },
  {
    username: "devika",
    email: "devika@example.com",
    password: "password123",
    bio: "Writing about code, design, and remote work.",
  },
  {
    username: "ishaan",
    email: "ishaan@example.com",
    password: "password123",
    bio: "Open source, backend notes, and experiments.",
  },
  {
    username: "meera",
    email: "meera@example.com",
    password: "password123",
    bio: "Marketing links, campaigns, and growth notes.",
  },
  {
    username: "vivaan",
    email: "vivaan@example.com",
    password: "password123",
    bio: "Engineering projects and technical writing.",
  },
  {
    username: "sana",
    email: "sana@example.com",
    password: "password123",
    bio: "Personal site, newsletter, and selected work.",
  },
  {
    username: "arjun",
    email: "arjun@example.com",
    password: "password123",
    bio: "Tools, templates, and project links.",
  },
];

const linkTemplates = [
  { title: "Portfolio", url: "https://example.com/portfolio" },
  { title: "GitHub", url: "https://github.com" },
  { title: "LinkedIn", url: "https://linkedin.com" },
  { title: "Newsletter", url: "https://example.com/newsletter" },
];

const userAgents = [
  "Mozilla/5.0 Chrome/125.0 Windows NT 10.0",
  "Mozilla/5.0 Safari/605.1.15 iPhone",
  "Mozilla/5.0 Firefox/126.0 Linux x86_64",
  "Mozilla/5.0 Chrome/125.0 Android",
];

const getPastDate = (daysAgo, hourOffset) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(9 + hourOffset, 15, 0, 0);
  return date;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Database connected");

    await Promise.all([
      clickModel.deleteMany({}),
      linkModel.deleteMany({}),
      userModel.deleteMany({}),
    ]);

    const createdUsers = await userModel.create(users);
    const createdLinks = [];
    const createdClicks = [];

    for (const [userIndex, user] of createdUsers.entries()) {
      const linkCount = 2 + (userIndex % 3);

      for (let linkIndex = 0; linkIndex < linkCount; linkIndex += 1) {
        const template = linkTemplates[linkIndex];
        const clickCount = 5 + userIndex * 2 + linkIndex * 3;

        const link = await linkModel.create({
          user: user._id,
          title: template.title,
          url: `${template.url}/${user.username}`,
          clickCount,
        });

        createdLinks.push(link);

        for (let clickIndex = 0; clickIndex < clickCount; clickIndex += 1) {
          createdClicks.push({
            link: link._id,
            user: user._id,
            clickedAt: getPastDate(clickIndex % 7, clickIndex % 10),
            ip: `192.168.${userIndex}.${clickIndex + 10}`,
            userAgent: userAgents[clickIndex % userAgents.length],
          });
        }
      }
    }

    await clickModel.insertMany(createdClicks);

    console.log(`Seeded ${createdUsers.length} users`);
    console.log(`Seeded ${createdLinks.length} links`);
    console.log(`Seeded ${createdClicks.length} clicks`);
    console.log("Default password for all users: password123");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

seedDatabase();
