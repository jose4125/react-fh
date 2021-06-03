import "@testing-library/jest-dom";
import React from "react";
import { shallow } from "enzyme";
import CounterApp from "../CounterApp";

describe("pruebas counterapp", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CounterApp />);
    });

    test("debe mostrar el comopoenete", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe mostrar el valor default del counter ", () => {
        const textoParrafo = wrapper.find("h2").text();

        expect(textoParrafo).toBe("10");
    });

    test("debe mostrar el valor inicial del counter enviado por props ", () => {
        const initValue = 100;
        const wrapper = shallow(<CounterApp value={initValue} />);
        const textoParrafo = wrapper.find("h2").text();

        expect(textoParrafo).toBe(initValue.toString());
    });

    test("debe incrementar", () => {
        wrapper.find("button").at(0).simulate("click");
        const textoParrafo = wrapper.find("h2").text();

        expect(textoParrafo).toBe("11");
    });

    test("debe disminuir", () => {
        wrapper.find("button").at(2).simulate("click");
        const textoParrafo = wrapper.find("h2").text();

        expect(textoParrafo).toBe("9");
    });

    test("debe resetear al valor por default", () => {
        wrapper.find("button").at(0).simulate("click");
        wrapper.find("button").at(1).simulate("click");
        const textoParrafo = wrapper.find("h2").text();

        expect(textoParrafo).toBe("10");
    });

    test("debe resetear al valor enviado por los props", () => {
        const initValue = 100;
        const wrapper = shallow(<CounterApp value={initValue} />);
        wrapper.find("button").at(0).simulate("click");
        wrapper.find("button").at(1).simulate("click");
        const textoParrafo = wrapper.find("h2").text();

        expect(textoParrafo).toBe(initValue.toString());
    });
});
