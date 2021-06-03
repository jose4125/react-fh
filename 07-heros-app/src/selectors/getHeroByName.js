import { heroes } from "../data/heroes";

export const getHeroesByName = (name = "") => {
  if (!name) return [];

  return heroes.filter(({ superhero }) =>
    superhero.toLowerCase().includes(name.toLowerCase())
  );
};
