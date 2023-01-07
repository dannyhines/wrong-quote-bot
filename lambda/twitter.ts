import { TwitterApi } from "twitter-api-v2";
require("dotenv").config();

const twitterUserConfig = {
  appKey: process.env.TWITTER_API_KEY ?? "",
  appSecret: process.env.TWITTER_API_SECRET ?? "",
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
};

const userClient = new TwitterApi(twitterUserConfig);

export const sendTweet = async (text: string) => {
  try {
    await userClient.v1.tweet(text);
    return true;
  } catch (err) {
    console.log("Error sending tweet:", err);
  }
  return false;
};
