import { api } from "./network";

const Recipes = {
  async index() {
    try {
      const { data } = await api.get("/recipes");
      return data.recipes;
    } catch (error) {
      return error;
    }
  }
};
