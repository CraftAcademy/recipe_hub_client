import { api } from "./network";

const Recipes = {
  async index(currentUser) {
    try {
      const { data } = await api.get("/recipes", {
        params: {
          user: currentUser.uid
        }
      });
      return data.recipes;
    } catch (error) {
      return error;
    }
  },
  async show(id) {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  },
  async create(recipe) {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const response = await api.post(
        "/recipes",
        {
          recipe: {
            name: recipe.name,
            instructions: recipe.instructions,
            user: headers.uid
          }
        },
        {
          headers: headers
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
};
export default Recipes;
