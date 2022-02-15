import { api } from "./network";

const Comments = {
  async create(id) {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const response = await api.post(
        `/recipes/${id}/comments`,
        {
          comment: {
            body: "I really liked your focaccia"
          }
        },
        {
          headers: headers
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
};
export default Comments