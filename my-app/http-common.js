import axios from "axios";

export default axios.create({
  baseURL: "https://karpboard.cognifidecloud.net/",
  headers: {
    "Content-type": "application/json"
  }
});