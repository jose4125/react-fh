import "@testing-library/jest-dom";
import { getUser, getUsuarioActivo } from "../../base/05-funciones";

describe("testing 05 funciones", () => {
    test("testing getUser", () => {
        const mockUser = {
            uid: "ABC123",
            username: "El_Papi1502",
        };
        const user = getUser();

        expect(user).toEqual(mockUser);
    });

    test("testing getUserActivo", () => {
        const nombre = "jose";
        const mockUser = {
            uid: "ABC567",
            username: nombre,
        };
        const user = getUsuarioActivo(nombre);

        expect(user).toEqual(mockUser);
    });
});
