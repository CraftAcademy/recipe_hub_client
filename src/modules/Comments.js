import { api } from "./network";

const Comments = {
  async create(id, comment) {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const { data } = await api.post(
        `/recipes/${id}/comments`,
        {
          comment: {
            body: comment.body
          }
        },
        {
          headers: headers
        }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
};
export default Comments;
