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
      };

      nextOps[replica as ReplicaId] =
        operations[replica as ReplicaId].concat(addOp);
    }

    setOperations(nextOps);
  }, [operations]);

  return (
    <div className="col-span-12 flex stack font-mono text-2xl justify-end p-10 border-b border-b-outline">
      <button
        className="text-neon border border-neon px-8 py-4 hover:bg-neon-light transition-colors"
        onClick={incrementAddOp}
      >
        Add +
      </button>
      <button
        className="text-neon-negative border border-neon-negative px-8 py-4 hover:bg-neon-negative-light transition-colors"
        onClick={incrementRmvOp}
      >
        Remove -
      </button>
    </div>
  );
};

export default CanvasControls;
