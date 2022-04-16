import type { Op } from "../types/operations";

export const findNonCommutativeOps = (ops: { "1": Op[]; "2": Op[] }) => {
  const nonCommutativeOps = [];

  for (let i = 0; i < ops["1"].length; i++) {
    if (
      (ops["1"][i].type === "add" &&
        ops["2"][i].type === "rmv" &&
        ops["1"][i].payload === ops["2"][i].payload) ||
      (ops["1"][i].type === "rmv" &&
        ops["2"][i].type === "add" &&
        ops["1"][i].payload === ops["2"][i].payload)
    ) {
      nonCommutativeOps.push({ op1: ops["1"][i], op2: ops["2"][i], index: i });
    }
  }

  return nonCommutativeOps;
};

export const findNonCommutativeOpIndices = (ops: { "1": Op[]; "2": Op[] }) => {
  const nonCommutativeOps = findNonCommutativeOps(ops);

  return nonCommutativeOps.map(({ index }) => index);
};
