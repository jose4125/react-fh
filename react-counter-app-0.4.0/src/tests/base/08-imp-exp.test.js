import "@testing-library/jest-dom";
import { getHeroeById, getHeroesByOwner } from "../../base/08-imp-exp";
import heros from "../../data/heroes";

describe("test import export", () => {
    test("getHeroeById", () => {
        const id = 1;
        const mockHero = heros.find((hero) => hero.id === id);
        const hero = getHeroeById(id);

        expect(hero).toEqual(mockHero);
    });

    test("getHeroeById no id found", () => {
        const id = 10;
        const hero = getHeroeById(id);

        expect(hero).toBeUndefined();
    });

    test("getHeroeById no id", () => {
        const hero = getHeroeById();

        expect(hero).toBeUndefined();
    });

    test("getHeroesByOwner marvel", () => {
        const owner = "Marvel";
        const mockHeroes = heros.filter((hero) => hero.owner === owner);
        const marvelHeros = getHeroesByOwner(owner);

        expect(marvelHeros).toEqual(mockHeroes);
        expect(marvelHeros).toHaveLength(mockHeroes.length);
    });

    test("getHeroesByOwner DC", () => {
        const owner = "DC";
        const mockHeroes = heros.filter((hero) => hero.owner === owner);
        const DcHeros = getHeroesByOwner(owner);

        expect(DcHeros).toEqual(mockHeroes);
        expect(DcHeros).toHaveLength(mockHeroes.length);
    });

    test("getHeroesByOwner no owner found", () => {
        const owner = "no";
        const heros = getHeroesByOwner(owner);

        expect(heros).toHaveLength(0);
    });

    test("getHeroesByOwner no owner", () => {
        const heros = getHeroesByOwner();

        expect(heros).toHaveLength(0);
    });
});
