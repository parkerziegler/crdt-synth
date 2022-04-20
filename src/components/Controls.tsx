import * as React from "react";
import { useAtom } from "jotai";

import { operationsAtom } from "../atoms/operations";
import type { Op, ReplicaId } from "../types/operations";

const CanvasControls = () => {
  const [operations, setOperations] = useAtom(operationsAtom);

  const incrementAddOp = React.useCallback(() => {
    const nextOps = {} as Record<ReplicaId, Op[]>;

    for (const replica in operations) {
      const addOp: Op = {
        type: "add",
        id: `operation_${operations[replica as ReplicaId].length}`,
        payload: 0,
        reconciled: false,
      };

      nextOps[replica as ReplicaId] =
        operations[replica as ReplicaId].concat(addOp);
    }

    setOperations(nextOps);
  }, [operations]);

  const incrementRmvOp = React.useCallback(() => {
    const nextOps = {} as Record<ReplicaId, Op[]>;

    for (const replica in operations) {
      const addOp: Op = {
        type: "rmv",
        id: `operation_${operations[replica as ReplicaId].length}`,
        payload: 0,
        reconciled: false,
      };

      nextOps[replica as ReplicaId] =
        operations[replica as ReplicaId].concat(addOp);
    }

    setOperations(nextOps);
  }, [operations]);

  return (
    <div className="col-span-12 flex stack font-mono items-center p-10 border-b border-b-outline">
      <h1 className="text-neon-caution text-5xl flex-1 font-bold">
        Set CRDT Visualizer
      </h1>
      <button
        className="text-neon text-2xl border border-neon px-8 py-4 hover:bg-neon-light transition-colors"
        onClick={incrementAddOp}
      >
        Add +
      </button>
      <button
        className="text-neon-negative text-2xl border border-neon-negative px-8 py-4 hover:bg-neon-negative-light transition-colors"
        onClick={incrementRmvOp}
      >
        Remove -
      </button>
    </div>
  );
};

export default CanvasControls;
