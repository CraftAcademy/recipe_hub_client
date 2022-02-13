import JtockAuth from "j-tockauth";
import { apiURL } from "./network";

const auth = new JtockAuth({
  host: apiURL,
  prefixUrl: "/api",
  debug: false
});

export default auth;
