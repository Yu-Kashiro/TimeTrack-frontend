import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.TIME_TRACK_API_DOMAIN,
  }),
  options
);
