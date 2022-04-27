import { Op, Replicas } from "../types/operations";
import { findNonCommutativeOps } from "./commutativity";

const executeSetInstruction = (set: Set<number>, op: Op): void => {
  switch (op.type) {
    case "add":
      set.add(op.payload);
      break;
    case "rmv":
      set.delete(op.payload);
      break;
    default:
      break;
  }
};

export const computeReplicaStateAtStep = (
  ops: Replicas,
  step: number
): [Set<number>, Set<number>] | null => {
  const firstNonCommutativeOp = findNonCommutativeOps(ops)[0];

  // Set as the loop bound either of the following:
  // 1. If there is a non-commutative op and the step comes after it, use non-commutative op's index.
  // 2. Else, just use the step itself as the bound.
  const bound =
    firstNonCommutativeOp && step > firstNonCommutativeOp.index
      ? firstNonCommutativeOp.index
      : step;

  // For all steps that occur after a non-commutative op, return null.
  if (step > bound) {
    return null;
  }

  const state1 = new Set<number>();
  const state2 = new Set<number>();

  // Execute the operations as defined in the replicas
  // until we encounter a non-commutative pair, if one exists.
  for (let i = 0; i <= bound; i++) {
    const pair = ops["1"][i].first
      ? [ops["1"][i], ops["2"][i]]
      : [ops["2"][i], ops["1"][i]];

    pair.forEach((op) => {
      executeSetInstruction(state1, op);
    });
  }

  // Execute the non-commutative operation in the opposite order to show
  // the other possible state.
  for (let i = 0; i <= bound; i++) {
    const pair = ops["1"][i].first
      ? [ops["1"][i], ops["2"][i]]
      : [ops["2"][i], ops["1"][i]];

    // We only want to reverse pairs that haven't been reconciled.
    if (!pair[0].reconciled && !pair[1].reconciled) {
      pair.reverse();
    }

    pair.forEach((op) => {
      executeSetInstruction(state2, op);
    });
  }

  return [state1, state2];
};
