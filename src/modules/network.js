import axios from "axios";

let apiURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  apiURL = "http://localhost:3000/api";
} else {
  apiURL = "https://recipe-hub-api.herokuapp.com/api";
}

export const api = axios.create({ baseURL: apiURL });
