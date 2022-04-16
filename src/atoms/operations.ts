import { atom } from "jotai";
import { Op } from "../types/operations";

const seedOperationType = () => {
  if (Math.random() < 0.33) {
    return "add" as const;
  } else if (Math.random() < 0.66) {
    return "rmv" as const;
  } else {
    return null;
  }
};

const generateOperations = (): Op[] => {
  return new Array(5).fill(undefined).map((_, i) => {
    return {
      id: `operation_${i}`,
      type: seedOperationType(),
      payload: Math.floor(Math.random() * 10),
    };
  });
};

const initialOperations = {
  "1": generateOperations(),
  "2": generateOperations(),
};

export const operationsAtom = atom(initialOperations);
