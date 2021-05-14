import "@testing-library/jest-dom";
import { getSaludo } from "../../base/02-template-string";

describe("test string", () => {
    test("should return a greething", () => {
        const nombre = "david";
        const saludo = getSaludo(nombre);

        expect(saludo).toBe(`Hola ${nombre}`);
    });

    test("should return the default greething", () => {
        const saludo = getSaludo();

        expect(saludo).toBe("Hola jose");
    });
});
