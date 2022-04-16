import ConflictReporter from "./ConflictReporter";
import Controls from "./Controls";
import Replica from "./Replica";
import StateTracker from "./StateTracker";

const Canvas = () => {
  return (
    <div className="flex flex-col col-span-12 lg:col-span-8">
      <Controls />
      <div className="flex flex-col justify-center flex-1 stack-v mx-auto max-w-full p-10 overflow-auto">
        <ConflictReporter />
        <Replica replicaId="1" />
        <Replica replicaId="2" />
        <StateTracker />
      </div>
    </div>
  );
};

export default Canvas;
