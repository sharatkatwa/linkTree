import linkModel from "../models/link.model.js";
import clickModel from "../models/click.model.js";

export const trackClick = async (req, res) => {
  const { linkId } = req.params;

  const link = await linkModel.findById(linkId);
  if (!link) return res.status(404).json({ message: "link not found" });

  const click = await clickModel.findOne({
    ip: req.ip,
    link: linkId,
  });
  if (click) return res.status(400).json({ message: "already clicked" });

  link.clickCount += 1;
  await link.save();

  const newClick = await clickModel.create({
    link: link._id,
    user: link.user,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  return res.status(201).json({ message: "link clicked", link, newClick });
};

export const getMyClicksPerDay = async (req, res) => {
  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const clicks = await clickModel.aggregate([
    {
      $match: {
        user: req.user._id,
        clickedAt: {
          $gte: sevenDaysAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$clickedAt",
          },
        },
        clicks: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        clicks: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: clicks,
  });
};

export const getMyClicks = async (req, res) => {
  try {
    const user = req.user;

    // Only return links that are not marked as deleted.
    const links = await linkModel.find({ user: user._id, isDeleted: false });
    return res
      .status(200)
      .json({ message: "all link clicks fetched successfully", links });
      
  } catch (error) {
    // Send a generic server error if the link query fails.
    res.status(500).json({ message: "error in getting my links" });
  }
};
