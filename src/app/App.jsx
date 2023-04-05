//Components
import { Form } from "../components/Form";

function App() {

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <section
      className="border p-1"
      >
        <div>
          <h1 className="text-center text-2xl uppercase"> Carga Manual </h1>
        </div> 
        <Form/>
      </section>
    </div>
  );
}

export default App;
