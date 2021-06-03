import "@testing-library/jest-dom";
import React from "react";
import { shallow } from "enzyme";
import PrimeraApp from "../PrimeraApp";

describe("pruebas primeraApp", () => {
    test("debe mostrar el comopoenete", () => {
        const saludo = "hola soy goku";
        const wrapper = shallow(<PrimeraApp saludo={saludo} />);

        expect(wrapper).toMatchSnapshot();
    });

    test("debe mostrar el subtitulo enviado por props", () => {
        const saludo = "hola soy goku";
        const subtitulo = "Soy un subtitulo";
        const wrapper = shallow(
            <PrimeraApp saludo={saludo} subtitulo={subtitulo} />
        );
        const textoParrafo = wrapper.find("p").text();

        expect(textoParrafo).toBe(subtitulo);
    });
});
