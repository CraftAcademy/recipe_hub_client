import auth from "./auth";

const Authentication = {
  async signUp(name, email, password, password_confirmation) {
    try {
      const { data } = await auth.signUp({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      });
      return data;
    } catch (error) {
      return error.response?.data.errors.full_messages || error.message;
    }
  },
  async signIn(credentials) {
    try {
      const response = await auth.signIn(
        credentials.email,
        credentials.password
      );
      return response;
    } catch (error) {
      return error.response?.data.errors || error.message;
    }
  }
};

export default Authentication;
