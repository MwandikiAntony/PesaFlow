import Token from "../models/Token.js";

export const saveTokenData = async (req, res) => {
  const token = await Token.findOneAndUpdate(
    { userId: req.user.userId, meterNumber: req.body.meterNumber },
    req.body,
    { upsert: true, new: true }
  );

  res.json(token);
};

export const getTokenData = async (req, res) => {
  const list = await Token.find({ userId: req.user.userId });
  res.json(list);
};
