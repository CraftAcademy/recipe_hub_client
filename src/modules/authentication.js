import Auth from "./auth";

const Authentication = {
  async signUp(name, email, password, password_confirmation) {
    try {
      const { data } = await Auth.signUp({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      });
      return data;
    } catch (error) {
      return error.response?.data.errors.full_messages || error.message;
    }
  }
};

export default Authentication;
