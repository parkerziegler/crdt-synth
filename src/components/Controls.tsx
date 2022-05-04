import * as React from "react";
import { useAtom } from "jotai";

import { operationsAtom } from "../atoms/operations";
import type { Op, ReplicaId } from "../types/operations";

const CanvasControls = () => {
  const [operations, setOperations] = useAtom(operationsAtom);

  const incrementOp = React.useCallback(
    (opType: "add" | "rmv") => () => {
      const nextOps = {} as Record<ReplicaId, Op[]>;

      for (const replica in operations) {
        const op: Op = {
          type: opType,
          id: `operation_${operations[replica as ReplicaId].length}`,
          payload: 0,
          reconciled: false,
          first: replica === "1",
        };

        nextOps[replica as ReplicaId] =
          operations[replica as ReplicaId].concat(op);
      }

      setOperations(nextOps);
    },
    [operations]
  );

  return (
    <div className="col-span-12 flex stack font-mono items-center p-10 border-b border-b-outline">
      <h1 className="text-neon-caution text-5xl flex-1 font-bold">
        Set CRDT Visualizer
      </h1>
      <button
        className="text-neon text-2xl border border-neon px-8 py-4 hover:bg-neon-light transition-colors"
        onClick={incrementOp("add")}
      >
        Add +
      </button>
      <button
        className="text-neon-negative text-2xl border border-neon-negative px-8 py-4 hover:bg-neon-negative-light transition-colors"
        onClick={incrementOp("rmv")}
      >
        Remove -
      </button>
    </div>
  );
};

export default CanvasControls;
