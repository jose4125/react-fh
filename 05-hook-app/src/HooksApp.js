import { CounterApp } from "./components/01-useState/CounterApp";
import { CounterWithCustomHook } from "./components/01-useState/CounterWithCustomHook";
import { SimpleForm } from "./components/02-useEfect/SimpleForm";
import { FormWithCustomHooks } from "./components/02-useEfect/FormWithCustomHook";
import { MultipleCustomHooks } from "./components/03-examples/MultipleCustomHooks";
import { FocusScreen } from "./components/04-useRef/FocusScreen";
import { Memorize } from "./components/06-memos/Memorize";
import { MemoHook } from "./components/06-memos/MemoHook";
import { CallbackHook } from "./components/06-memos/CallbackHook";
import { Padre } from "./components/07-tarea-memo/Padre";
import { TodoApp } from "./components/08-useReducer/TodoApp";

function HooksApp() {
  return (
    <div className="App">
      <CounterApp />
      <CounterWithCustomHook />
      <SimpleForm />
      <FormWithCustomHooks />
      <MultipleCustomHooks />
      <FocusScreen />
      <Memorize />
      <MemoHook />
      <CallbackHook />
      <Padre />
      <TodoApp />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HooksApp;
