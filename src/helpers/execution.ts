import { Op } from "../types/operations";
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
  ops: { "1": Op[]; "2": Op[] },
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
    Object.keys(ops).forEach((replica) => {
      const op = ops[replica as "1" | "2"][i];

      executeSetInstruction(state1, op);
    });
  }

  // Execute the non-commutative operation in the opposite order to show
  // the other possible state.
  for (let i = 0; i <= bound; i++) {
    Object.keys(ops)
      .reverse()
      .forEach((replica) => {
        const op = ops[replica as "1" | "2"][i];
        console.log({ op });

        executeSetInstruction(state2, op);
      });
  }

  console.log(state1, state2, step);

  return [state1, state2];
};
