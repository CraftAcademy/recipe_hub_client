import { api } from "./network";

const Recipes = {
  async index() {
    try {
      const { data } = await api.get("/recipes");
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
      const response = await api.post("/recipes", {
        recipe: {
          name: recipe.name,
          instructions: recipe.instructions
        }
      });
      return response;
    } catch (error) {
      return error;
    }
  }
};
export default Recipes;
