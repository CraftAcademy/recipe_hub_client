import JtockAuth from "j-tockauth";

const Auth = new JtockAuth({
  host: "http://localhost:3000",
  prefixUrl: "/api",
  debug: false
});

export default Auth;
