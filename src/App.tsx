import Canvas from "./components/Canvas";
import MetaliftEditor from "./components/MetaliftEditor";

const App = () => {
  return (
    <div className="absolute inset-0 bg-canvas grid grid-cols-12">
      <Canvas />
      <MetaliftEditor />
    </div>
  );
};

export default App;
