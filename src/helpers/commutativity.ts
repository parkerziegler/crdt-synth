import type { Replicas } from "../types/operations";

export const findConflictOps = (replicas: Replicas) => {
  const nonCommutativeOps = [];

  for (let i = 0; i < replicas["1"].length; i++) {
    const [replica1Op, replica2Op] = [replicas["1"][i], replicas["2"][i]];
    const areOppositeOps =
      (replica1Op.type === "add" && replica2Op.type === "rmv") ||
      (replica1Op.type === "rmv" && replica2Op.type === "add");
    const areNotReconciled = !replica1Op.reconciled || !replica2Op.reconciled;

    if (areOppositeOps && areNotReconciled) {
      nonCommutativeOps.push({ op1: replica1Op, op2: replica2Op, index: i });
    }
  }

  return nonCommutativeOps;
};

export const findConflictOpIndices = (replicas: Replicas) => {
  const nonCommutativeOps = findConflictOps(replicas);

  return nonCommutativeOps.map(({ index }) => index);
};
