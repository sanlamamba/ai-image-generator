import openai from "../../utils/openai/index.js";
import User from "../models/users.js";

export const createImage = async (req, res) => {
  try {
    const userDecoded = req.user;
    const user = await User.findById(userDecoded.id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.requestRemaining() <= 0) {
      return res.status(400).json({ message: "Request limit exceeded" });
    }

    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    user.subscription.requestsMade += 1;
    await user.save();

    res.status(200).json({ photo: image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
