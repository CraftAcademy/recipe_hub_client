import { api } from "./network";

const Recipes = {
  async index(currentUser) {
    try {
      if (currentUser) {
        const { data } = await api.get("/recipes", {
          params: {
            user: currentUser.uid
          }
        });
        return data;
      } else {
        const { data } = await api.get("/recipes");
        return data.recipes;
      }
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
  async delete(id) {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const { data } = await api.delete(`/recipes/${id}`, {
        headers: headers
      });
      return data;
    } catch (error) {
      return error;
    }
  },
  async create(recipe) {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      if (recipe.fork) {
        let { data } = await api.post(
          "/recipes",
          {
            recipe: {
              id: recipe.id,
              fork: recipe.fork
            }
          },
          {
            headers: headers
          }
        );
        data.forked = true;
        return data;
      } else {
        const { data } = await api.post(
          "/recipes",
          {
            recipe: {
              name: recipe.name,
              instructions: recipe.instructions,
              image: recipe.image,
              ingredients_attributes: [...recipe.ingredients_attributes]
            }
          },
          {
            headers: headers
          }
        );
        return data;
      }
    } catch (error) {
      return error;
    }
  },
  async update(recipe) {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const response = await api.put(
        `/recipes/${recipe.id}`,
        {
          recipe: {
            name: recipe.name,
            instructions: recipe.instructions,
            image: recipe.image,
            ingredients: [...recipe.ingredients]
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
  },
  async getIngredients() {
    try {
      const { data } = await api.get("/ingredients");
      return data.ingredients;
    } catch (error) {
      return error;
    }
  }
};
export default Recipes;
