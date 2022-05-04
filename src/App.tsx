import Canvas from "./components/Canvas";
import Synthesizer from "./components/Synthesizer";

const App = () => {
  return (
    <div className="absolute inset-0 bg-canvas grid grid-cols-12">
      <Canvas />
      <Synthesizer />
    </div>
  );
};

export default App;
