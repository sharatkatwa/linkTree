import linkModel from "../models/link.model.js";
import userModel from "../models/user.model.js";

// Create a new link for the authenticated user.
// Expects `url` and `title` in the request body and attaches the current user ID.
export const createLink = async (req, res) => {
  try {
    const { url, title } = req.body;
    const user = req.user;

    // Persist the new link and associate it with the authenticated user.
    let newLink = await linkModel.create({ url, title, user: user._id });

    // Populate the `user` field with the username to return friendly output.
    newLink = await newLink.populate("user", "username");

    res
      .status(200)
      .json({ message: "link created successufully", data: newLink });
    return;
  } catch (error) {
    // Send a generic server error if link creation fails.
    res.status(500).json({ message: "error in creating link", error });
  }
};

// Fetch public links for the supplied username.
// The request should include a `username` param in the URL path.
export const getLinks = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username)
      return res.status(400).json({ message: "username is required" });

    // Find the target user by username before loading their links.
    const user = await userModel.findOne({ username });

    if (!user) return res.status(400).json("invalid username");

    // Only return links that are not marked as deleted.
    const links = await linkModel.find({ user: user._id, isDeleted: false });
    return res
      .status(200)
      .json({ message: "all user links fetched successufully", links });
  } catch (error) {
    // Send a generic server error if the link query fails.
    res.status(500).json({ message: "error in getting links" });
  }
};

// Soft delete a link by marking it as deleted.
// The link id should come from the request params and the user should be authenticated.
export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Mark the link as deleted instead of removing the document permanently.
    await linkModel.findByIdAndUpdate(id, { isDeleted: true });
    return res.status(200).json({ message: "link deleted successufully" });
  } catch (error) {
    // Send a generic server error if deletion fails.
    res.status(500).json({ message: "error deleting link" });
  }
};
