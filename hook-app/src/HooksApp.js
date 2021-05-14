import { CounterApp } from "./components/01-useState/CounterApp";
import { CounterWithCustomHook } from "./components/01-useState/CounterWithCustomHook";
import { SimpleForm } from "./components/02-useEfect/SimpleForm";
import { FormWithCustomHooks } from "./components/02-useEfect/FormWithCustomHook";
import { MultipleCustomHooks } from "./components/03-examples/MultipleCustomHooks";
import { FocusScreen } from "./components/04-useRef/FocusScreen";

function HooksApp() {
  return (
    <div className="App">
      <CounterApp />
      <CounterWithCustomHook />
      <SimpleForm />
      <FormWithCustomHooks />
      <MultipleCustomHooks />
      <FocusScreen />
    </div>
  );
}

export default HooksApp;
